const introCourses = [
    { id: "CS 240", name: "Introduction to Discrete Mathematics" },
    { id: "CS 252", name: "Introduction to Computer Engineering" },
    { id: "CS 300", name: "Programming II" },
    { id: "CS 354", name: "Machine Organization and Programming" },
    { id: "CS 400", name: "Programming III" }
];

const mathCourses = [
    { id: "MATH 221 & MATH 222 or MATH 171 & MATH 217 & MATH 222", name: "Calculus (choose 1)" },
    { id: "MATH 320 or MATH 340 or MATH 341 or MATH 345 or MATH 375", name: "Linear Algebra (choose 1)" },
    { id: "STAT 509 or STAT 311 or STAT 324 or MATH 331 or STAT 333 or STAT 340 or STAT 371 or STAT 341 or MATH 531", name: "Probability or Statistics (choose 1)" }
];

const advancedCourses = [
    {
        name: "Theory of Computer Science",
        required: "1 course required",
        courses: ["CS 520: Introduction to Theory of Computing"]
    },
    {
        name: "Software & Hardware",
        required: "2 courses required",
        courses: ["CS 536: Programming Languages and Compilers", "CS 537: Operating Systems", "CS 552: Computer Architecture", "CS 557: Parallel Programming", "CS 564: Database Management Systems"]
    },
    {
        name: "Applications",
        required: "1 course required",
        courses: ["CS 540: Artificial Intelligence", "CS 544: Big Data Systems", "CS 559: Computer Graphics", "CS 564: Database Management Systems", "CS 571: Building User Interfaces"]
    },
    {
        name: "Electives",
        required: "2 courses required",
        courses: ["CS 435: Cryptography", "CS 525: Linear Optimization", "CS 538: Theory and Design of Programming Languages", "CS 542: Software Security", "CS 577: Introduction to Algorithms", "CS 640: Computer Networks", "CS 642: Information Security"]
    }
];

function makeListBox(courses, containerId) {
    const container = document.getElementById(containerId);

    const card = document.createElement('div');
    card.className = 'card p-4 m-2';
    card.style.backgroundColor = '#f1f1f1';

    courses.forEach(course => {
        const text = document.createElement('p');
        text.textContent = `${course.id} — ${course.name}`;
        text.style.marginBottom = '8px';

        card.appendChild(text);
    });

    container.appendChild(card);
}

function makeAdvancedCard(course) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6';

    const card = document.createElement('div');
    card.className = 'card p-3 m-2';
    card.style.backgroundColor = '#f1f1f1';
    card.style.cursor = 'pointer';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const title = document.createElement('h5');
    title.textContent = course.name;
    title.style.marginBottom = '0';    

    const badge = document.createElement('span');
    badge.textContent = course.required;
    badge.style.fontSize = '14px';

    header.appendChild(title);
    header.appendChild(badge);

    const courseList = document.createElement('div');
    courseList.style.display = 'none';
    courseList.style.marginTop = '12px';

    course.courses.forEach(c => {
        const text = document.createElement('p');
        text.textContent = c;
        text.style.color = 'white';
        text.style.marginBottom = '8px';
        courseList.appendChild(text);
    });

    card.addEventListener('click', () => {
        if (courseList.style.display === 'none') {
            courseList.style.display = 'block';
        } else {
            courseList.style.display = 'none';
        }
    });

    card.appendChild(header);
    card.appendChild(courseList);
    col.appendChild(card);

    return col;
}

function makeAdvancedGrid(courses, containerId) {
    const container = document.getElementById(containerId);
    const row = document.createElement('div');
    row.className = 'row';

    courses.forEach(course => {
        row.appendChild(makeAdvancedCard(course));
    });

    container.appendChild(row);
}

makeListBox(introCourses, 'intro-courses');
makeListBox(mathCourses, 'math-courses');
makeAdvancedGrid(advancedCourses, 'advanced-courses');