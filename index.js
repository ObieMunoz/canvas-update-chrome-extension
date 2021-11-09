let checkCanvasLoaded = setInterval(() => {
    if (document.title === "Dashboard" || document.title.includes("Modules")) {
        clearInterval(checkCanvasLoaded);
        initOther();
    } else if (document.readyState === 'complete' && document.querySelectorAll(".icon-mark-as-read").length > 0) {
        clearInterval(checkCanvasLoaded);
        initCourse();
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
    newListContainer.style.backgroundColor = 'white';
    newListContainer.style.border = '1px solid lightgray';
    newListContainer.style.borderRadius = '5px';
    newListContainer.style.textAlign = 'center';
    newListContainer.innerHTML = `<strong>${username}'s REAL To Do List</strong><hr><ol style='text-align:left'>` + incompleteTaskElements.join("") + `</ol><em>Thanks for using Obie's Canvas Upgrade!<br><a href="https://github.com/ObieMunoz/canvas-update-chrome-extension/issues/new" target="_blank">Problems/Errors? Let me know!</a></em>`
    toDoList.replaceChildren(newListContainer)
}

function checksToStars() {
    const greenChecks = document.querySelectorAll('.icon-check')
    greenChecks.forEach(check => {
        check.className = "icon-star"
        check.style.color = 'gold'
    })
}

function removeMainCalendar() {
    const unusedCalendar = document.querySelector(".menu-item:nth-child(4)")
    unusedCalendar.remove()
}

function displayLogo() {
    const logo = document.createElement("img")
    logo.src = "https://github.com/ObieMunoz/canvas-update-chrome-extension/blob/main/images/favicon-32x32.png?raw=true"
    logo.style.position = "fixed"
    logo.style.top = "0"
    logo.style.right = "0"
    logo.style.zIndex = "9999"
    logo.style.width = "32px"
    logo.style.height = "32px"
    document.body.appendChild(logo)
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