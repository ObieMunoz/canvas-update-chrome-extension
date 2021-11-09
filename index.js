(function () {
    const timer = setTimeout(() => {
        try {
            const incompleteTasks = document.querySelectorAll(".icon-mark-as-read")
            const listTaskNames = [];
            const scriptVariables = document.getElementsByTagName("script")[3].text
            const username = scriptVariables.slice(scriptVariables.indexOf("display_name") + 15, scriptVariables.indexOf("avatar_image") - 3)

            let count = 0;

            if (incompleteTasks.length > 0) {
                incompleteTasks.forEach(task => {
                    listTaskNames.push(`${++count}. <a href=${task.parentNode.parentNode.querySelector("a").href}>${task.parentNode.parentNode.querySelector("a").innerText}</a>`)
                })
            } else {
                listTaskNames.push(`WARNING: You either have no incomplete tasks or we had a loading error.`)
            }

            const div = document.createElement("div");
            const toDoList = document.querySelector(".todo-list")
            div.style.backgroundColor = 'white';
            div.style.border = '1px solid red';
            div.innerHTML = `<strong>${username}'s REAL To Do List</strong><br><hr>` + listTaskNames.join("<br>") + `<br><br><em>Thanks for using Obie's Canvas Upgrade!</em>`
            toDoList.replaceChildren(div)

        } catch { }

        try {
            const greenChecks = document.querySelectorAll('.icon-check')
            greenChecks.forEach(check => {
                check.className = "icon-star"
                check.style.color = 'gold'
            })
        } catch { }

    }, 1000)
})();
