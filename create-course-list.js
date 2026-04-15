const courseListNode = document.getElementById('course-list');

const COURSES = getCourseList();

COURSES.forEach((e) => {
    appendCourseComponent(e);
})

/**
 * Given some course data, returns a new HTML element.
 * @param {object} courseData the course data object
 * @returns an HTML element to be placed into the webpage
 */
function appendCourseComponent(courseData) {
    const newColDivNode = document.createElement("div");
    newColDivNode.id = `course-${courseData.id}`;
    

    newColDivNode.className = "col-12 col-sm-6 col-xl-3";
    
    const newCardDivNode = document.createElement("div");
    newCardDivNode.className = "card m-2 p-2";

    const newTitleNode = document.createElement("h2");
    newTitleNode.innerText = `${courseData.id}: ${courseData.name}`;

    const newCreditsNode = document.createElement("p");
    newCreditsNode.style.fontWeight = 200;
    newCreditsNode.innerText = `${courseData.credits} credits`;

    const newBadgesDivNode = document.createElement("div");
    newBadgesDivNode.style.display = "flex";


    const newDescNode = document.createElement("p");
    if(courseData.description.length>199){
        newDescNode.innerText = courseData.description.slice(0, 200)+"...";
    } else {
        newDescNode.innerText = courseData.description;
    }

    const newReadMoreBtnNode = document.createElement("button");
    newReadMoreBtnNode.className = "btn btn-outline-secondary";
    newReadMoreBtnNode.innerText = "Read More";
    // EXTRA TODO Implement the button such that it toggles the amount
    //            of description that is being shown (e.g. 200 characters)
    //       HINT You will likely use an event listener here.
    newReadMoreBtnNode.addEventListener("click", () => {
        if(newReadMoreBtnNode.innerText == 'Read More'){
            newDescNode.innerText = courseData.description;
            newReadMoreBtnNode.innerText = 'Read Less';
        } else {
            if(courseData.description.length>199){
                newDescNode.innerText = courseData.description.slice(0, 200)+"...";
            } else {
                newDescNode.innerText = courseData.description;
            }
            newReadMoreBtnNode.innerText = 'Read More';
        }
    })

    newCardDivNode.appendChild(newTitleNode);
    newCardDivNode.appendChild(newCreditsNode);
    newCardDivNode.appendChild(newBadgesDivNode)
    newCardDivNode.appendChild(newDescNode);
    newCardDivNode.appendChild(newReadMoreBtnNode)

    newColDivNode.appendChild(newCardDivNode);

    document.getElementById("course-list").appendChild(newColDivNode);
}
