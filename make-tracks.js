const tracks = [
    {
        name: "Unspecialized",
        details: "."
    },
    {
        name: "Theory",
        details: "Focuses on algorithms, complexity, and formal methods. Relevant courses: CS 577, CS 520."
    },
    {
        name: "Programming Languages",
        details: "."
    },
    {
        name: "Networks",
        details: "Covers distributed systems and networking. Relevant courses: CS 640, CS 739."
    },
    {
        name: "Systems",
        details: "."
    },
    {
        name: "Architecture",
        details: "."
    },
    {
        name: "Security",
        details: "Covers cryptography, . Relevant courses: CS 642, CS 542, CS 435."
    },
    {
        name: "AI/ML",
        details: "Covers machine learning, computer vision, and NLP. Relevant courses: CS 540, CS 539, CS 544."
    },
    {
        name: "Optimization",
        details: "."
    },
    {
        name: "Human Computer Interaction",
        details: "."
    },
    {
        name: "Industry",
        details: "."
    }    
];

function makeTrackItem(track, index) {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.style.marginBottom = '15px';

    const button = document.createElement('button');
    button.className = 'accordion-button collapsed';
    button.style.fontWeight = 'bold';
    button.textContent = track.name;

    const body = document.createElement('div');
    body.className = 'accordion-body';
    body.textContent = track.details;
    body.style.display = 'none';

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