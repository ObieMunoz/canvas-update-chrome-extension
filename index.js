window.onload = () => {
    delay().then(init);
}

function delay(timeout = 1500) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function displayLogo() {
    const link = document.createElement("a");
    const logo = document.createElement("img")
    logo.src = "https://github.com/ObieMunoz/canvas-update-chrome-extension/blob/main/images/favicon-32x32.png?raw=true"
    link.className = "canvas-update-logo"
    link.href = "https://github.com/ObieMunoz/canvas-update-chrome-extension"
    link.appendChild(logo)
    document.body.appendChild(link)
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
    const greenChecks = document.querySelectorAll(".icon-check");
    if (greenChecks.length === 0) return;

    greenChecks.forEach(check => {
        check.className = "icon-star"
    })
}

function removeMainCalendar() {
    const calendar = document.getElementById("global_nav_calendar_link").parentNode
    if (calendar) calendar.remove()
}

function quizGrader() {
    const quizList = document.querySelectorAll(".quiz")
    if (quizList.length === 0 || document.title !== "Quizzes") return;

    quizList.forEach(quiz => {
        const grade = quiz.querySelector(".ig-details").children
        if (grade.length === 2) {
            const yourScore = parseInt(grade[0].innerText)
            const topScore = parseInt(grade[1].innerText)
            if (yourScore === topScore) quiz.firstChild.style.backgroundColor = "lightgreen"
            else if (yourScore < topScore) quiz.firstChild.style.backgroundColor = "lightpink"
        } else {
            quiz.firstChild.style.backgroundColor = "lightblue"
        }
    })
}

function assignmentGrader() {
    const assignmentList = document.querySelectorAll(".assignment")
    if (assignmentList.length === 0 || !document.title.includes("Assignments")) return;
    for (assignment of assignmentList) {
        const scoreDisplay = assignment.querySelector(".score-display")
        if (scoreDisplay) {
            const scores = scoreDisplay.textContent.trim().slice(0, -4).split("/")
            if (scores[0] === "-") assignment.firstChild.style.backgroundColor = "orange";
            else if (parseInt(scores[0]) === parseInt(scores[1])) assignment.firstChild.style.backgroundColor = "lightgreen"
            else if (parseInt(scores[0]) < parseInt(scores[1])) assignment.firstChild.style.backgroundColor = "lightpink"
        }
    }
}

function init() {
    displayLogo();
    removeMainCalendar();
    updateToDoList();
    checksToStars();
    quizGrader();
    delay(2000).then(assignmentGrader);
}