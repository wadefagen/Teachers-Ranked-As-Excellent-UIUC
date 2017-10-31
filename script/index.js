
var rawTxtPath = "../raw_txt/";
var rawCSVPath = "../csv/"


var fs = require("fs");
var path = require("path");
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var files = fs.readdirSync(rawTxtPath);

var containsCourseData = function(s) {
  return /\d/.test(s);
};

var isPageBoundry = function (s) {
  s = s.toUpperCase();
  return !(
    s.indexOf("SPRING") == -1 &&
    s.indexOf("SUMMER") == -1 &&
    s.indexOf("FALL") == -1 &&
    s.indexOf("WINTER") == -1
  );
};

var findTerm = function (s) {
  s = s.toUpperCase();

  var term_re = /(WINTER|SPRING|SUMMER|FALL) (\d+)/;
  var semester = term_re.exec(s)[1];
  var year = term_re.exec(s)[2];

  if (semester == "WINTER")      { semester = "wi"; }
  else if (semester == "SPRING") { semester = "sp"; }
  else if (semester == "SUMMER") { semester = "su"; }
  else if (semester == "FALL")   { semester = "fa"; }
  return semester + year;
};

files.forEach(function (file) {
  console.log("Working on: " + file);
  var results = [];
  var lines = fs.readFileSync(path.join(rawTxtPath, file), "utf8").split("\n");

  var readingIntro = true;
  var unitName = undefined;
  var unitPersons = [];
  var term = "?";

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.length == 0) { continue; }

    if (readingIntro) {
      line_l = line.toLowerCase();

      // Spring 2017 format
      if (line.contains("Page 2")) {
        readingIntro = false;
        if (term == "?") { term = findTerm(termStr); }
        continue;
      }

      // Fall 2003 format
      if (line_l.contains("based on data collected")) {
        var termStr = line_l.substring(
          line_l.indexOf("based on data collected") + "based on data collected".length + 1
        ).trim();

        termStr = termStr.substring(0, termStr.indexOf(")"));
        term = findTerm(termStr);
      }

      if (line == "ACCOUNTANCY") {
        readingIntro = false;
      }
    }

    if (!readingIntro) {
      if (isPageBoundry(line)) { continue; }

      // When a unit name is `undefined`, the next thing we read is the unit name
      if (unitName === undefined || !containsCourseData(line)) {
        unitName = line;
      }

      else {
        // Find the end of the name -- the first space after the optional "* "
        var endOfName = line.indexOf(",") + 2;

        // Split the line into [name][courseString] segments
        var name = line.substring(0, endOfName);
        var courseString = line.substring(endOfName).trim();

        // Check if the name contians a * to denote "Outstanding"
        var ranking = "Excellent";
        if (name[0] == "*") {
          name = name.substring(2);
          ranking = "Oustanding";
        }

        nameSplit = name.split(",");
        var fname = nameSplit[1];
        var lname = nameSplit[0];

        // Parse the coures
        var personType = "Instructor";
        if (courseString.startsWith("TA")) {
          personType = "TA";
          courseString = courseString.substring(2).trim();
        }

        var courses = [];
        courseString.split(",").forEach(function (course) {
          courses.push(course.trim());
        });

        // Create the object
        var obj = {
          fname: fname,
          lname: lname,
          ranking: ranking,
          role: personType,
          courses: courses,
          unit: unitName,
          term: term
        };
        results.push(obj);
      }
    }
  }


  // Write the output...
  var csv = "term,unit,lname,fname,role,ranking,courses\n";
  results.forEach(function (obj) {
    obj.courses.forEach(function (course) {
      if (course == "0") { course = ""; }
      if (course == "000") { course = ""; }

      csv += obj.term + "," +
             "\"" + obj.unit + "\"," +
             obj.lname + "," +
             obj.fname + "," +
             obj.role + "," +
             obj.ranking + "," +
             course + "\n";
    })
  });

  fs.writeFileSync(path.join(rawCSVPath, "/tre-" + term + ".csv"), csv);

});
