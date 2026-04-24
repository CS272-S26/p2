const tracks = [
    {
        name: "Unspecialized",
        details: "This track is for students who want to explore CS broadly or haven't found a specific interest yet. It samples courses from every major area of the field.",
        courses: ["CS 524: Introduction to Optimization", "CS 537: Introduction to Operating Systems", "CS 540: Introduction to Artificial Intelligence", "CS 564: Database Management Systems: Design and Implementation", "CS 577: Introduction to Algorithms", "CS 536: Introduction to Programming Languages and Compilers", "CS 640: Introduction to Computer Networks", "CS 642: Introduction to Information Security"]
    },
    {
        name: "Industry",
        details: "This track is for students who are looking to enter the software industry. It focuses on practical skills learned in the industry.",
        courses: ["CS 472: Introduction to Web Development", "CS 506: Software Engineering", "CS 571: Building User Interfaces", "CS 620: Computer Sciences Capstone"]
    },
    {
        name: "Theory",
        details: "This track is for students interested in the mathematical foundations of computer science, including algorithms, complexity, and cryptography.",
        courses: ["CS 435: Introduction to Cryptography", "CS 520: Theory of Computing", "CS 577: Introduction to Algorithms"]
    },
    {
        name: "Optimization",
        details: "This track is for students interested in mathematical optimization and combinatorics, with applications in operations research and machine learning.",
        courses: ["CS 425: Introduction to Combinatorial Optimization", "CS 475: Introduction to Combinatorics", "CS 524: Introduction to Optimization", "CS 525: Linear Optimization"]
    },
    {
        name: "Programming Languages",
        details: "This track is for students interested in how programming languages are designed, implemented, and formally reasoned about.",
        courses: ["CS 536: Introduction to Programming Languages and Compilers", "CS 538: Introduction to the Theory and Design of Programming Languages"]
    },
    {
        name: "Networks",
        details: "This track is for students interested in how computers communicate, including network protocols, distributed systems, and operating systems fundamentals.",
        courses: ["CS 537: Introduction to Operating Systems", "CS 640: Introduction to Computer Networks"]
    },
    {
        name: "Systems",
        details: "This track is for students interested in low-level computing, including operating systems, computer architecture, databases, and parallel programming.",
        courses: ["CS 537: Introduction to Operating Systems", "CS 552: Introduction to Computer Architecture", "CS 557: Parallel & Throughput-Optimized Programming", "CS 536: Introduction to Programming Languages and Compilers", "CS 564: Database Management Systems: Design and Implementation"]
    },
    {
        name: "Security",
        details: "This track is for students interested in protecting systems and data, covering cryptography, software security, and information security.",
        courses: ["CS 435: Introduction to Cryptography", "CS 542: Introduction to Software Security", "CS 642: Introduction to Information Security"]
    },
    {
        name: "AI/ML",
        details: "This track is for students interested in artificial intelligence and machine learning, from foundational theory to neural networks and big data.",
        courses: ["CS 532: Matrix Methods in Machine Learning", "CS 539: Introduction to Artificial Neural Networks", "CS 540: Introduction to Artificial Intelligence", "CS 544: Introduction to Big Data Systems", "CS 561: Probability and Information Theory in Machine Learning", "CS 566: Introduction to Computer Vision"]
    }
];


function makeTrackItem(track, index) {
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

    const details = document.createElement('p');
    details.textContent = track.details;

    const courseList = document.createElement('ul');
    if (track.courses) {
        track.courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course;
            courseList.appendChild(li);
        });
    }

    body.appendChild(details);
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

const container = document.getElementById('tracks');
const accordion = document.createElement('div');
accordion.className = 'accordion';
accordion.id = 'tracksAccordion';

tracks.forEach((track, index) => {
    accordion.appendChild(makeTrackItem(track, index));
});

container.appendChild(accordion);