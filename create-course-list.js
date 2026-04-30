const courseListNode = document.getElementById("course-list");

const COURSES = getCourseList();

COURSES.forEach((e) => {
  appendCourseComponent(e);
});

const courseSearchNode = document.getElementById("course-search");
const noCourseResultNode = document.getElementById("no-course-result");

//Search bar
courseSearchNode.addEventListener("input", () => {
  const searchText = courseSearchNode.value.trim().toLowerCase();
  let visibleCourseCount = 0;

  document.querySelectorAll("#course-list li").forEach((course) => {
    const courseId = course.dataset.courseId.toLowerCase();
    const courseName = course.dataset.courseName.toLowerCase();
    const match =
      courseId.includes(searchText) || courseName.includes(searchText);

    if (match) {
      course.style.display = "";
      visibleCourseCount++;
    } else {
      course.style.display = "none";
    }
  });

  noCourseResultNode.style.display =
    visibleCourseCount === 0 ? "block" : "none";
});

/**
 * Given some course data, returns a new HTML element.
 * @param {object} courseData the course data object
 * @returns an HTML element to be placed into the webpage
 */
function appendCourseComponent(courseData) {
  // List item container
  const newItemNode = document.createElement("li");
  newItemNode.id = `course-${courseData.id}`;
  newItemNode.dataset.courseId = courseData.id;
  newItemNode.dataset.courseName = courseData.name;
  newItemNode.className = "list-group-item p-3 mb-2 rounded";
  newItemNode.style.border = "1px solid #c5050c";

  // Course title displaying ID and name
  const newTitleNode = document.createElement("h5");
  newTitleNode.innerText = `${courseData.id}: ${courseData.name}`;

  // Course credits
  const newCreditsNode = document.createElement("p");
  newCreditsNode.style.fontWeight = 200;
  newCreditsNode.innerText = `${courseData.credits} credits`;

  // Course description
  const newDescNode = document.createElement("p");
  if (courseData.description.length > 199) {
    newDescNode.innerText = courseData.description.slice(0, 200) + "...";
  } else {
    newDescNode.innerText = courseData.description;
  }

  // Read More/Less button
  const newReadMoreBtnNode = document.createElement("button");
  newReadMoreBtnNode.className = "btn btn-outline-secondary";
  newReadMoreBtnNode.innerText = "Read More";
  newReadMoreBtnNode.addEventListener("click", () => {
    if (newReadMoreBtnNode.innerText == "Read More") {
      newDescNode.innerText = courseData.description;
      newReadMoreBtnNode.innerText = "Read Less";
    } else {
      if (courseData.description.length > 199) {
        newDescNode.innerText = courseData.description.slice(0, 200) + "...";
      } else {
        newDescNode.innerText = courseData.description;
      }
      newReadMoreBtnNode.innerText = "Read More";
    }
  });

  // Star button
  const starBtn = document.createElement("button");
  starBtn.style.fontSize = "28px";
  starBtn.style.background = "none";
  starBtn.style.border = "none";
  starBtn.style.cursor = "pointer";
  starBtn.style.position = "absolute";
  starBtn.style.top = "10px";
  starBtn.style.right = "10px";

  // Star icon
  const starIcon = document.createElement("i");
  starIcon.className = "bi bi-star";
  starBtn.appendChild(starIcon);

  // Restore star state from localStorage if course was previously saved
  const saved = JSON.parse(localStorage.getItem("savedCourses")) || [];
  if (saved.some((c) => c.id === courseData.id)) {
    starIcon.className = "bi bi-star-fill";
    starIcon.style.color = "gold";
  }

  // Save & unsave course in localStorage when star is clicked
  starBtn.addEventListener("click", () => {
    let saved = JSON.parse(localStorage.getItem("savedCourses")) || [];
    if (starIcon.className === "bi bi-star") {
      starIcon.className = "bi bi-star-fill";
      starIcon.style.color = "gold";
      saved.push(courseData);
      localStorage.setItem("savedCourses", JSON.stringify(saved));
    } else {
      starIcon.className = "bi bi-star";
      starIcon.style.color = "black";
      saved = saved.filter((c) => c.id !== courseData.id);
      localStorage.setItem("savedCourses", JSON.stringify(saved));
    }
  });

  newItemNode.appendChild(newTitleNode);
  newItemNode.appendChild(newCreditsNode);
  newItemNode.appendChild(newDescNode);
  newItemNode.appendChild(newReadMoreBtnNode);
  newItemNode.appendChild(starBtn);

  document.getElementById("course-list").appendChild(newItemNode);
}
