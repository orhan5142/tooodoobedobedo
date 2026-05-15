let taskNumber = 1;
let sortClicked = true;

let addButton = document.querySelector('.add-text');
let taskContainer = document.querySelector('.task-container');
let sortBtn = document.querySelector('.sort-btn');
let plusBtn = document.querySelector('.add-circle');
let closeBtn = document.querySelector('.close-btn');
let closeImg = document.querySelector('.close-icon');

let clearBtn = document.createElement('button');
clearBtn.innerHTML = 'CLEAR ALL';
clearBtn.style.cssText = "display: block; margin: 10px auto; background: #FFD700; color: #000; border: 1px solid #000; border-radius: 8px; padding: 8px 20px; cursor: pointer; font-size: 12px; font-weight: 900; letter-spacing: 1px; transition: 0.3s;";
document.querySelector('.title').after(clearBtn);

clearBtn.onmouseenter = () => { clearBtn.style.backgroundColor = "#000"; clearBtn.style.color = "#FFD700"; };
clearBtn.onmouseleave = () => { clearBtn.style.backgroundColor = "#FFD700"; clearBtn.style.color = "#000"; };

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
        taskText.style.opacity = "0.4";
        checkbox.parentElement.style.backgroundColor = "#f0f0f0";
    } else {
        taskText.style.textDecoration = "none";
        taskText.style.opacity = "1";
        checkbox.parentElement.style.backgroundColor = "#fff";
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
    d.style.cssText = "display: flex; align-items: center; transition: 0.3s; padding: 10px; margin-bottom: 8px; border-radius: 8px;";

    d.innerHTML = `
        <input type="checkbox" class="task-check" onchange="toggleComplete(this)" style="accent-color: #FFD700; width: 20px; height: 20px; cursor: pointer; margin-right: 12px;">
        <div class="task-number" style="min-width: 20px;">${taskNumber}</div>
        <input class="task-text" value="${txt}" readonly style="flex: 1; border: none; background: transparent; outline: none; margin-left: 8px; font-weight: 500;">
        <button class="remove-task" style="background: transparent; border: none; cursor: pointer; display: flex; align-items: center;"><img class="delete-icon" src="images/Group 77.svg" style="width: 18px;"></button>
    `;

    taskNumber++;

    let del = d.querySelector('.remove-task');
    let img = d.querySelector('.delete-icon');

    del.onmouseenter = function () { img.src = "./images/Group 70.svg"; }
    del.onmouseleave = function () { img.src = "./images/Group 77.svg"; }
    del.onclick = function () { d.remove(); if (taskContainer.children.length === 0) taskContainer.classList.add('hidden'); }

    taskContainer.classList.remove('hidden');
    taskContainer.appendChild(d);
    inp.value = "";
    document.querySelector('.task-input-area').classList.add('hidden');
}

addButton.onclick = elaveEt;

document.onkeydown = function (e) {
    if (e.key === "Enter" && !document.querySelector('.task-input-area').classList.contains('hidden')) elaveEt();
    if (e.key === "+") {
        e.preventDefault();
        document.querySelector('.task-input-area').classList.remove('hidden');
        document.querySelector('.main-task-input').focus();
    }
}

sortBtn.onclick = function () {
    let t = Array.from(taskContainer.querySelectorAll('.task-item'));
    if (t.length === 0) return;
    t.sort((a, b) => {
        let x = a.querySelector('.task-text').value.toLowerCase();
        let y = b.querySelector('.task-text').value.toLowerCase();
        return sortClicked ? (x < y ? -1 : 1) : (x > y ? -1 : 1);
    });
    sortClicked = !sortClicked;
    taskContainer.innerHTML = "";
    t.forEach(x => taskContainer.appendChild(x));
}
