function delay() {
    return new Promise(resolve => setTimeout(resolve, 500));
}

let checkCanvasLoaded = setInterval(() => {
    if (document.title === "Dashboard" || document.title.includes("Modules")) {
        clearInterval(checkCanvasLoaded);
        delay().then(() => initOther());
    } else if (document.title === "Quizzes" && document.querySelectorAll(".ig-details").length > 0) {
        clearInterval(checkCanvasLoaded);
        delay().then(() => initQuizzes());
    } else if (document.readyState === 'complete' && document.querySelectorAll(".icon-mark-as-read").length > 0) {
        clearInterval(checkCanvasLoaded);
        delay().then(() => initCourse());
    }
}, 100);

function updateToDoList() {
    const incompleteTaskElements = [];
    let incompleteTasks = document.querySelectorAll(".icon-mark-as-read");
    let scriptVariables = document.getElementsByTagName("script")[3].text;
    let username = scriptVariables.slice(scriptVariables.indexOf("display_name") + 15, scriptVariables.indexOf("avatar_image") - 3);
    if (username === "" || username === undefined || username.length > 30) {
        username = "Unknown";
        console.log("CANVAS+: Username detection error. Using default username:", username);
    }
    let toDoList = document.querySelector(".todo-list")
    if (incompleteTasks.length > 0) {
        incompleteTasks.forEach(task => {
            incompleteTaskElements.push(`<li><a href=${task.parentNode.parentNode.querySelector("a").href}>${task.parentNode.parentNode.querySelector("a").innerText}</a></li>`)
        })
    } else {
        incompleteTaskElements.push(`You have no incomplete tasks!`)
    }
    const newListContainer = document.createElement("div");
    newListContainer.className = "canvas-update-todo-list-container";
    newListContainer.innerHTML = `<strong>${username}'s REAL To Do List</strong><hr><ol>` + incompleteTaskElements.join("") + `</ol><em>Thanks for using Obie's Canvas Upgrade!<br><a href="https://github.com/ObieMunoz/canvas-update-chrome-extension/issues/new" target="_blank">Problems/Errors? Let me know!</a></em>`
    toDoList.replaceChildren(newListContainer)
}

function checksToStars() {
    const greenChecks = document.querySelectorAll('.icon-check')
    greenChecks.forEach(check => {
        check.className = "icon-star"
    })
}

function removeMainCalendar() {
    const unusedCalendar = document.querySelector(".menu-item:nth-child(4)")
    unusedCalendar.children[0].innerText.includes("Calendar") ? unusedCalendar.remove() : console.log("CANVAS+: Unable to find Calendar module to remove.");
}

function displayLogo() {
    const logo = document.createElement("img")
    logo.src = "https://github.com/ObieMunoz/canvas-update-chrome-extension/blob/main/images/favicon-32x32.png?raw=true"
    logo.className = "canvas-update-logo"
    document.body.appendChild(logo)
}

function quizGrader() {
    const quizGrades = document.querySelectorAll(".ig-details")
    quizGrades.forEach(grade => {
        if (!grade.children[1]) grade.parentNode.parentNode.parentNode.style.backgroundColor = "lightblue"
        else if (parseInt(grade.children[0].innerText) === parseInt(grade.children[1].innerText)) {
            grade.parentNode.parentNode.parentNode.style.backgroundColor = "lightgreen"
        } else if (parseInt(grade.children[0].innerText) < parseInt(grade.children[1].innerText)) {
            grade.parentNode.parentNode.parentNode.style.backgroundColor = "pink"
        }
    })
}

function initCourse() {
    updateToDoList();
    checksToStars();
    removeMainCalendar();
    displayLogo();
}

function initOther() {
    checksToStars();
    removeMainCalendar();
    displayLogo();
}

function initQuizzes() {
    quizGrader();
    displayLogo();
    removeMainCalendar();
}