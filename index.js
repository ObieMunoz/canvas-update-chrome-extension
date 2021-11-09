let checkCanvasLoaded = setInterval(() => {
    if (document.readyState === 'complete' && document.querySelectorAll(".icon-mark-as-read").length > 0) {
        clearInterval(checkCanvasLoaded);
        init();
    }
}, 100);

function updateToDoList() {
    const listTaskNames = [];
    let incompleteTasks = document.querySelectorAll(".icon-mark-as-read");
    let scriptVariables = document.getElementsByTagName("script")[3].text;
    let username = scriptVariables.slice(scriptVariables.indexOf("display_name") + 15, scriptVariables.indexOf("avatar_image") - 3);
    if (username === "" || username === undefined || username.length > 30) {
        username = "Unknown";
    }
    let count = 0;
    let toDoList = document.querySelector(".todo-list")
    if (incompleteTasks.length > 0) {
        incompleteTasks.forEach(task => {
            listTaskNames.push(`${++count}. <a href=${task.parentNode.parentNode.querySelector("a").href}>${task.parentNode.parentNode.querySelector("a").innerText}</a>`)
        })
    } else {
        listTaskNames.push(`You have no incomplete tasks!`)
    }
    const newListContainer = document.createElement("div");
    newListContainer.style.backgroundColor = 'white';
    newListContainer.style.border = '1px solid red';
    newListContainer.innerHTML = `<strong>${username}'s REAL To Do List</strong><br><hr>` + listTaskNames.join("<br>") + `<br><br><em>Thanks for using Obie's Canvas Upgrade!</em>`
    toDoList.replaceChildren(newListContainer)
}

function checksToStars() {
    const greenChecks = document.querySelectorAll('.icon-check')
    greenChecks.forEach(check => {
        check.className = "icon-star"
        check.style.color = 'gold'
    })
}

function init() {
    updateToDoList();
    checksToStars();
}