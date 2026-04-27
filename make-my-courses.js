const saved = JSON.parse(localStorage.getItem('savedCourses')) || [];

const container = document.getElementById('my-courses');

if (saved.length === 0) {
    const msg = document.createElement('p');
    msg.textContent = '(No courses saved yet, go to the "Course List" page and click the star on courses you like)';
    container.appendChild(msg);
} else {
    const list = document.createElement('ul');
    list.className = 'list-group';

    saved.forEach(courseData => {
        const item = document.createElement('li');
        item.className = 'list-group-item p-3 mb-2 rounded';
        item.style.border = '1px solid #c5050c';

        const title = document.createElement('h5');
        title.innerText = `${courseData.id}: ${courseData.name}`;

        const credits = document.createElement('p');
        credits.innerText = `${courseData.credits} credits`;

        const desc = document.createElement('p');
        desc.innerText = courseData.description;

        item.appendChild(title);
        item.appendChild(credits);
        item.appendChild(desc);
        list.appendChild(item);
    });

    container.appendChild(list);
}