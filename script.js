let taskNumber = 1;
let sortClicked = true;

let addButton = document.querySelector('.add-text');
let taskContainer = document.querySelector('.task-container');
let sortBtn = document.querySelector('.sort-btn');
let plusBtn = document.querySelector('.add-circle');
let closeBtn = document.querySelector('.close-btn');
let closeImg = document.querySelector('.close-icon');

let clearBtn = document.createElement('button');
clearBtn.innerHTML = 'Hamısını təmizlə';
clearBtn.style.cssText = "display: block; margin: 0 auto 10px auto; background: #FF4D4D; color: white; border: none; border-radius: 4px; padding: 5px 15px; cursor: pointer; font-size: 12px; font-weight: bold;";
document.querySelector('.title').after(clearBtn);

clearBtn.onclick = function() {
    taskContainer.innerHTML = "";
    taskNumber = 1;
    taskContainer.classList.add('hidden');
};

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

closeImg.onmouseleave = function () {
    closeImg.src = "./images/Group 77.svg";
}

closeBtn.onclick = function () {
    document.querySelector('.task-input-area').classList.add('hidden');
}

function toggleComplete(checkbox) {
    let taskText = checkbox.nextElementSibling.nextElementSibling;
    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
        taskText.style.opacity = "0.5";
    } else {
        taskText.style.textDecoration = "none";
        taskText.style.opacity = "1";
    }
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
    d.style.display = "flex";
    d.style.alignItems = "center";

    d.innerHTML = `
        <input type="checkbox" class="task-check" onchange="toggleComplete(this)" style="margin-right: 10px; width: 18px; height: 18px; cursor: pointer;">
        <div class="task-number">${taskNumber}</div>
        <input class="task-text" value="${txt}" readonly style="flex: 1; border: none; background: transparent; outline: none; margin-left: 5px;">
        <button class="remove-task" style="background: transparent; border: none; cursor: pointer;"><img class="delete-icon" src="images/Group 77.svg" style="width: 20px;"></button>
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
        }
    }

    taskContainer.classList.remove('hidden');
    taskContainer.appendChild(d);

    inp.value = "";
    document.querySelector('.task-input-area').classList.add('hidden');
}

addButton.onclick = elaveEt;

document.onkeydown = function (e) {
    if (e.key === "Enter" && !document.querySelector('.task-input-area').classList.contains('hidden')) {
        elaveEt();
    }
    if (e.key === "+") {
        e.preventDefault();
        let a = document.querySelector('.task-input-area');
        let i = document.querySelector('.main-task-input');
        a.classList.remove('hidden');
        i.value = "";
        i.focus();
    }
}

sortBtn.onclick = function () {
    let t = Array.from(taskContainer.querySelectorAll('.task-item'));
    if (t.length === 0) return;

    t.sort(function (a, b) {
        let x = a.querySelector('.task-text').value.toLowerCase();
        let y = b.querySelector('.task-text').value.toLowerCase();
        if (sortClicked) return x < y ? -1 : x > y ? 1 : 0;
        else return x > y ? -1 : x < y ? 1 : 0;
    });

    sortClicked = !sortClicked;
    taskContainer.innerHTML = "";
    t.forEach(x => taskContainer.appendChild(x));
}
