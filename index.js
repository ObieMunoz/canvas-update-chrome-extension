function delay() {
    return new Promise(resolve => setTimeout(resolve, 500));
}

window.onload = () => {
    delay().then(init);
}

function displayLogo() {
    const logo = document.createElement("img")
    logo.src = "https://github.com/ObieMunoz/canvas-update-chrome-extension/blob/main/images/favicon-32x32.png?raw=true"
    logo.className = "canvas-update-logo"
    document.body.appendChild(logo)
}

function updateToDoList() {
    let incompleteTasks = document.querySelectorAll(
        "[title='Must submit the assignment'], [title='Must view the page']");
    if (incompleteTasks.length === 0) return;

    const incompleteTaskElements = [];
    const envScript = document.scripts[3].text;
    const username = envScript.slice(
        envScript.indexOf("display_name") + 15,
        envScript.indexOf("avatar_image") - 3);
    if (!envScript.includes("display_name")) {
        username = "Unknown";
        console.log("CANVAS+: Username detection error. Using default username:", username);
    }

    incompleteTasks.forEach(task => {
        const taskUrl = task.parentNode.parentNode.querySelector("a").href;
        const taskName = task.parentNode.parentNode.querySelector("a").innerText;
        incompleteTaskElements.push(
            `<li><a href=${taskUrl}>${taskName}</a></li>`)
    })

    const toDoList = document.querySelector(".todo-list")
    const newListContainer = document.createElement("div");
    newListContainer.className = "canvas-update-todo-list-container";

    newListContainer.innerHTML =
        `<strong>${username}'s REAL To Do List</strong><hr><ol>` +
        incompleteTaskElements.join("") +
        `</ol><em>Thanks for using Obie's Canvas Upgrade!<br>
    <a href="https://github.com/ObieMunoz/canvas-update-chrome-extension/issues/new" 
    target="_blank"
    >Problems/Errors? Let me know!</a></em>`

    toDoList.replaceChildren(newListContainer)
}

function checksToStars() {
    const greenChecks = document.querySelectorAll("[title='Completed']");
    if (greenChecks.length === 0) return;

    greenChecks.forEach(check => {
        check.className = "icon-star"
    })
}

function removeMainCalendar() {
    console.log("CANVAS+: Removing main calendar.")
    const unusedCalendar = document.querySelector(".menu-item:nth-child(4)")
    unusedCalendar.children[0].innerText.includes("Calendar") ? unusedCalendar.remove() : console.log("CANVAS+: Unable to find Calendar module to remove.");
}

function quizGrader() {
    console.log("CANVAS+: Grading quizzes.")
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

function assignmentGrader() {
    console.log("CANVAS+: Grading assignments.")
    const scoreDisplays = document.querySelectorAll(".score-display")
    const scores = scoreDisplays.forEach(score => {
        score.textContent.trim().slice(0, -4).split("/")
    })
    const gradedScores = scores.forEach(score => {
        if (score[0] === "-") return "Ungraded"
        else if (score[0] === score[1]) return "Perfect"
        else if (score[0] < score[1]) return "Imperfect"
    })
    console.log(gradedScores)
}

function init() {
    displayLogo();
    // removeMainCalendar();
    updateToDoList();
    checksToStars();
    // quizGrader();
    // assignmentGrader();
}


// function initCourse() {
//     updateToDoList();
//     checksToStars();
//     removeMainCalendar();
//     displayLogo();
//     // parseScript();
// }

// function initOther() {
//     checksToStars();
//     removeMainCalendar();
//     displayLogo();
// }

// function initQuizzes() {
//     quizGrader();
//     displayLogo();
//     removeMainCalendar();
// }