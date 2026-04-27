const introCourses = [
    {
        name: "Introductory Computer Science Courses",
        courses: ["CS 240: Introduction to Discrete Mathematics", "CS 252: Introduction to Computer Engineering", "CS 300: Programming II", "CS 354: Machine Organization and Programming", "CS 400: Programming III"]
    }
];

const mathCourses = [
    {
        name: "Calculus (1 course)",
        courses: ["MATH 221 & MATH 222: Calculus and Analytic Geometry I & II", "MATH 171 & MATH 217 & MATH 222: Calculus with Algebra and Trigonometry I & II & Calculus and Analytic Geometry II"]
    },
    {
        name: "Linear Algebra (1 course)",
        courses: ["MATH 320: Linear Algebra and Differential Equations", "MATH 340: Elementary Matrix and Linear Algebra", "MATH 341: Linear Algebra", "MATH 345: Linear Algebra and Optimization", "MATH 375: Topics in Multi-Variable Calculus and Linear Algebra"]
    },
    {
        name: "Probability or Statistics (1 course)",
        courses: ["STAT 309: Introduction to Probability and Mathematical Statistics I", "STAT 311: Introduction to Theory and Methods of Mathematical Statistics I", "STAT 324: Introduction to Statistics for Science and Engineering", "MATH 331: Introductory Probability", "STAT 333: Applied Regression Analysis", "STAT 340: Data Science Modeling II", "STAT 371: Introductory Applied Statistics for the Life Sciences", "STAT/MATH 431: Introduction to the Theory of Probability", "MATH 531: Probability Theory"]
    }
];

const advancedCourses = [
    {
        name: "Theory of Computer Science (1 course)",
        courses: ["CS 520: Introduction to Theory of Computing", "CS 577: Introduction to Algorithms"]
    },
    {
        name: "Software & Hardware (2 courses)",
        courses: ["CS 407: Foundations of Mobile Systems and Applications", "CS 506: Software Engineering", "CS 536: Introduction to Programming Languages and Compilers / CS 538: Introduction to the Theory and Design of Programming Languages", "CS 537: Introduction to Operating Systems", "CS 542: Introduction to Software Security", "CS 544: Introduction to Big Data Systems", "CS 552: Introduction to Computer Architecture", "CS 557: Parallel & Throughput-Optimized Programming", "CS 564: Database Management Systems: Design and Implementation", "CS 640: Introduction to Computer Networks", "CS 642: Introduction to Information Security"]
    },
    {
        name: "Applications (1 course)",
        courses: ["CS 412: Introduction to Numerical Methods", "CS 425: Introduction to Combinatorial Optimization", "CS 513: Numerical Linear Algebra", "CS 514: Numerical Analysis", "CS 524: Introduction to Optimization", "CS 525: Linear Optimization", "CS 540: Introduction to Artificial Intelligence", "CS 541: Theory & Algorithms for Data Science", "CS 559: Computer Graphics", "CS 565: Introduction to Data Visualization", "CS 566: Introduction to Computer Vision", "CS 570: Introduction to Human-Computer Interaction", "CS 571: Building User Interfaces"]
    },
    {
        name: "Electives (2 courses)",
        courses: ["CS 407: Foundations of Mobile Systems and Applications", "CS 412: Introduction to Numerical Methods", "CS 425: Introduction to Combinatorial Optimization", "CS 435: Introduction to Cryptography", "CS 471: Introduction to Computational Statistics", "CS 475: Introduction to Combinatorics", "CS 506: Software Engineering", "CS 513: Numerical Linear Algebra", "CS 514: Numerical Analysis", "CS 518: Wearable Technology", "CS 520: Introduction to Theory of Computing", "CS 524: Introduction to Optimization", "CS 525: Linear Optimization", "CS 526: Advanced Linear Programming", "CS 532: Matrix Methods in Machine Learning", "CS 533: Image Processing", "CS 536: Introduction to Programming Languages and Compilers", "CS 537: Introduction to Operating Systems", "CS 538: Introduction to the Theory and Design of Programming Languages", "CS 539: Introduction to Artificial Neural Networks", "CS 540: Introduction to Artificial Intelligence", "CS 541: Theory & Algorithms for Data Science", "CS 542: Introduction to Software Security", "CS 544: Introduction to Big Data Systems", "CS 552: Introduction to Computer Architecture", "CS 557: Parallel & Throughput-Optimized Programming", "CS 559: Computer Graphics", "CS 561: Probability and Information Theory in Machine Learning", "CS 564: Database Management Systems: Design and Implementation", "CS 565: Introduction to Data Visualization", "CS 566: Introduction to Computer Vision", "CS 567: Biomedical Image Analysis", "CS 570: Introduction to Human-Computer Interaction", "CS 571: Building User Interfaces", "CS 576: Introduction to Bioinformatics", "CS 577: Introduction to Algorithms", "CS 579: Virtual Reality", "CS 620: Computer Sciences Capstone", "CS 640: Introduction to Computer Networks", "CS 642: Introduction to Information Security", "CS 639: Undergraduate Elective Topics in Computing"]
    }
];

function makeCourseItem(track, index) {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.style.marginBottom = '15px';

    const button = document.createElement('button');
    button.className = 'accordion-button collapsed';
    button.style.fontWeight = 'bold';
    button.style.backgroundColor = '#f1f1f1';
    button.textContent = track.name;

    const body = document.createElement('div');
    body.className = 'accordion-body';
    body.style.display = 'none';

    const courseList = document.createElement('ul');
    if (track.courses) {
        track.courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course;
            courseList.appendChild(li);
        });
    }
    
    body.appendChild(courseList);

    button.addEventListener('click', () => {
        if (body.style.display === 'none') {
            body.style.display = 'block';
            button.className = 'accordion-button';
        } else {
            body.style.display = 'none';
            button.className = 'accordion-button collapsed';
        }
    });

    item.appendChild(button);
    item.appendChild(body);

    return item;
}

const introCourseContainer = document.getElementById('intro-courses');
const introCourseAccordion = document.createElement('div');
introCourseAccordion.className = 'accordion';
introCourseAccordion.id = 'introCourseAccordion';

introCourses.forEach((track, index) => {
    introCourseAccordion.appendChild(makeCourseItem(track, index));
});

const mathCourseContainer = document.getElementById('math-courses');
const mathCourseAccordion = document.createElement('div');
mathCourseAccordion.className = 'accordion';
mathCourseAccordion.id = 'mathCourseAccordion';

mathCourses.forEach((track, index) => {
    mathCourseAccordion.appendChild(makeCourseItem(track, index));
});

const advancedCourseContainer = document.getElementById('advanced-courses');
const advancedCourseAccordion = document.createElement('div');
advancedCourseAccordion.className = 'accordion';
advancedCourseAccordion.id = 'advancedCourseAccordion';

advancedCourses.forEach((track, index) => {
    advancedCourseAccordion.appendChild(makeCourseItem(track, index));
});

introCourseContainer.appendChild(introCourseAccordion);
mathCourseContainer.appendChild(mathCourseAccordion);
advancedCourseContainer.appendChild(advancedCourseAccordion);
