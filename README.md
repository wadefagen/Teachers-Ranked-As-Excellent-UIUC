# Teachers Ranked as Excellent at The University of Illinois

A collection of all "Teachers Ranked as Excellent" at UIUC from Fall 1993 to present (Summer 2017).

[A single CSV containing all of the data can be downloaded here.][Single_PDF_Download]

[Single_PDF_Download]: https://raw.githubusercontent.com/wadefagen/Teachers-Ranked-As-Excellent-UIUC/master/TRE-UIUC-AllYears.csv


## Background

At the University of Illinois at Urbana-Champaign, every semester students complete an Instructor and Course Evaluation (ICES) questionnaire for each course they are enrolled.  The Center for Innovation in Teaching and Learning (CTIL) compiles this data into the list of "Teachers Ranked as Excellent" and publishes the names of those teaches in the local newspaper and [online as a PDF][TRE_CITL].

[TRE_CITL]: http://citl.illinois.edu/citl-101/measurement-evaluation/teaching-evaluation/teaching-evaluations-(ices)/teachers-ranked-as-excellent


## Repository Contents

This repository contains a collection of all known lists of "Teachers Ranked as Excellent", dating back to 1993, in a consistent, documented CSV format.  Each semester can be found in the `csv` directory.

The goal of this repository is to provide an easy interface for the use of this data in data science projects.

### CSV Fields

All CSVs contain eight fields, with field labels in the first row and data in all following rows.  The data contained in the fields are as follows:

- `term`: Two letter semester code (`sp`, `su`, `fa`, or `wi`) followed by a four digit year.
  * Examples: `sp2017`, `fa2013`, `su2012`.

- `unit`: The CITL-supplied headers for the unit teaching the course.
  * Examples: `ACCOUNTANCY`, `SOCIAL WORK`, `LINGUISTICS`, `NUCLEAR, PLASMA & RAD. ENGR.`

- `lname`: The last name of the teacher.
  * Examples: `FAGEN-ULMSCHNEIDER`, `FLANAGAN`, `FLECK`

- `fname`: The first letter of the first name of the teacher.
  * Examples: `W`, `K`, `M`

- `role`: `Instructor` or `TA`

- `ranking`: `Excellent` or `Outstanding`

- `course`: The course the teacher was ranked as excellent.  If no course is given, the `course` field is empty (this includes cases when the raw data lists the course as `0` or `000`).
  * Examples: `199`, `225`, `560`


#### Ranked as Excellent in Multiple Courses in One Semester

The same teacher may be ranked for multiple courses in a single semester.  In that case, the teacher will appear more than once.  For example:
```
sp2012,"NUCLEAR, PLASMA & RAD. ENGR.",AXFORD,R,Instructor,Excellent,447
sp2012,"NUCLEAR, PLASMA & RAD. ENGR.",AXFORD,R,Instructor,Excellent,521
```


### Scripts

The script used to generate this data can be found in `scripts`.
