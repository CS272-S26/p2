const creators = [
    { name: "Tyler Tang", image: "./images/tyler.jpg", bio: "Hi I'm Tyler, I am majoring in Computer Science. I like playing volleyball and basketball with people from my social org, the Chinese American Student Association" },
    { name: "Ray Wang", image: "./images/ray.jpg", bio: "Hi I'm Ray, I am majoring in Information Science and minoring in Computer Science. I play videogames and I like cooking." },
    { name: "Will Dvorak", image: "./images/will.jpg", bio: "Hi I'm Will, I am majoring in Computer Science. I like to watch shows, movies and to play videogames" },
    { name: "Jae Woo Song", image: "./images/jaewoo.jpg", bio: "Hi I'm Jae Woo, I am majoring in Computer Science and minoring in Math. My hobbies are grappling sports and finding good restaurants." }
];

/**
 * Creates and returns a card element for a given creator.
 * The card displays the creator's profile image, name, and a toggle button
 * that shows or hides their bio when clicked.
 * @param {object} creator - the creator data object
 * @returns {HTMLElement} a card div element to be placed into the webpage
 */
function makeCreatorCard(creator) {
    // Card
    const card = document.createElement('div');
    card.className = 'card text-center p-4';
    card.style.width = '50%';
    card.style.margin = '40px auto';

    // Image
    const img = document.createElement('img');
    img.src = creator.image;
    img.className = 'rounded-circle mb-3';
    img.style.width = '150px';
    img.style.height = '150px';
    img.style.display = 'block';
    img.style.margin = '0 auto';

    // Name
    const name = document.createElement('h5');
    name.textContent = creator.name;

    // Button
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'View Bio';

    // Bio
    const bio = document.createElement('p');
    bio.textContent = creator.bio;
    bio.style.display = 'none';

    btn.addEventListener('click', () => {
        if (bio.style.display === 'none') {
            bio.style.display = 'block';
            btn.textContent = 'Hide Bio';
        } else {
            bio.style.display = 'none';
            btn.textContent = 'View Bio';
        }
    });

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(btn);
    card.appendChild(bio);

    return card;
}

// Get the creators container and append a card for each creator
const container = document.getElementById('creators');
creators.forEach((creator) => {
    container.appendChild(makeCreatorCard(creator));
});