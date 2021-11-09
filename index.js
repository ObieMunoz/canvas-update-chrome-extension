let checkCanvasLoaded = setInterval(() => {
    if (document.title === "Dashboard" || document.title.includes("Modules")) {
        clearInterval(checkCanvasLoaded);
        checksToStars();
    } else if (document.readyState === 'complete' && document.querySelectorAll(".icon-mark-as-read").length > 0) {
        clearInterval(checkCanvasLoaded);
        init();
    }
}, 100);

function updateToDoList() {
    const incompleteTaskElements = [];
    let incompleteTasks = document.querySelectorAll(".icon-mark-as-read");
    let scriptVariables = document.getElementsByTagName("script")[3].text;
    let username = scriptVariables.slice(scriptVariables.indexOf("display_name") + 15, scriptVariables.indexOf("avatar_image") - 3);
    if (username === "" || username === undefined || username.length > 30) {
        username = "Unknown";
        console.warn("CANVAS+: Username detection error. Using default username:", username);
    }
    let count = 0;
    let toDoList = document.querySelector(".todo-list")
    if (incompleteTasks.length > 0) {
        incompleteTasks.forEach(task => {
            incompleteTaskElements.push(`${++count}. <a href=${task.parentNode.parentNode.querySelector("a").href}>${task.parentNode.parentNode.querySelector("a").innerText}</a>`)
        })
    } else {
        incompleteTaskElements.push(`You have no incomplete tasks!`)
    }
    const newListContainer = document.createElement("div");
    newListContainer.style.backgroundColor = 'white';
    newListContainer.style.border = '1px solid red';
    newListContainer.innerHTML = `<strong>${username}'s REAL To Do List</strong><br><hr>` + incompleteTaskElements.join("<br>") + `<br><br><em>Thanks for using Obie's Canvas Upgrade!</em>`
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