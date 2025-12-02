let taskNumber = 1;
let sortClicked = true;

let addButton = document.querySelector('.add-text');
let taskContainer = document.querySelector('.task-container');
let sortBtn = document.querySelector('.sort-btn');
let plusBtn = document.querySelector('.add-circle');
let closeBtn = document.querySelector('.close-btn');
let closeImg = document.querySelector('.close-icon');

plusBtn.onclick = function () {
    let a = document.querySelector('.task-input-area');
    let i = document.querySelector('.main-task-input');
    a.classList.remove('hidden');
    i.value = "";
    i.focus();
}

closeBtn.onmouseenter = function () {
    closeImg.src = "./images/Group 70.svg";
}

closeBtn.onmouseleave = function () {
    closeImg.src = "./images/Group 77.svg";
}

closeBtn.onclick = function () {
    document.querySelector('.task-input-area').classList.add('hidden');
}


function elaveEt() {
    let inp = document.querySelector('.main-task-input');
    let txt = inp.value.trim();
    if (txt === "") {
        document.querySelector('.task-input-area').classList.add('hidden');
        return;
    }

    let d = document.createElement('div');
    d.className = "task-item";

    d.innerHTML = `
        <div class="task-number">${taskNumber}</div>
        <input class="task-text" value="${txt}" readonly>
        <button class="remove-task"><img class="delete-icon" src="images/Group 77.svg"></button>
    `;

    taskNumber++;

    let del = d.querySelector('.remove-task');
    let img = d.querySelector('.delete-icon');

    del.onmouseenter = function () {
        img.src = "./images/Group 70.svg";
    }

    del.onmouseleave = function () {
        img.src = "./images/Group 77.svg";
    }

    del.onclick = function () {
        d.remove();
        if (taskContainer.children.length === 0) {
            taskContainer.classList.add('hidden');
            let a = document.querySelector('.task-input-area');
            let i = document.querySelector('.main-task-input');
            a.classList.remove('hidden');
            i.value = "";
            i.focus();
        }
    }

    taskContainer.classList.remove('hidden');
    taskContainer.appendChild(d);

    inp.value = "";
    document.querySelector('.task-input-area').classList.add('hidden');
}

addButton.onclick = elaveEt;

document.onkeydown = function (e) {
    if (e.key === "+") {
        e.preventDefault();
        let a = document.querySelector('.task-input-area');
        let i = document.querySelector('.main-task-input');
        a.classList.remove('hidden');
        i.value = "";
        i.focus();
    }
}

sortBtn.onmouseenter = function () {
    if (sortClicked) sortBtn.src = "./images/Group 91.svg";
    else sortBtn.src = "./images/Group 73.svg";
}

sortBtn.onmouseleave = function () {
    if (sortClicked) sortBtn.src = "./images/Group 90.svg";
    else sortBtn.src = "./images/Group 74.svg";
}

sortBtn.onclick = function () {
    let t = Array.from(taskContainer.querySelectorAll('.task-item'));

    if (sortClicked) {
        t.sort(function (a, b) {
            let x = a.querySelector('.task-text').value.toLowerCase();
            let y = b.querySelector('.task-text').value.toLowerCase();
            if (x < y) return -1;
            if (x > y) return 1;
            return 0;
        });
        sortClicked = false;
    } else {
        t.sort(function (a, b) {
            let x = a.querySelector('.task-text').value.toLowerCase();
            let y = b.querySelector('.task-text').value.toLowerCase();
            if (x > y) return -1;
            if (x < y) return 1;
            return 0;
        });
        sortClicked = true;
    }

    taskContainer.innerHTML = "";
    t.forEach(x => taskContainer.appendChild(x));
}
