// Отримуємо елементи зі сторінки
let input    = document.getElementById("taskInput");
let addBtn   = document.getElementById("addBtn");
let list     = document.getElementById("taskList");
let clearBtn = document.getElementById("clearBtn");

// Завантажуємо задачі з localStorage (або порожній масив)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Поточний фільтр
let currentFilter = "all";

// Показуємо задачі при завантаженні сторінки
showTasks("all");

// Додаємо задачу при кліку на кнопку
addBtn.onclick = addTask;

// Додаємо задачу при натисканні Enter
input.onkeydown = function(e) {
	if (e.key === "Enter") addTask();
};

// Функція додавання задачі
function addTask() {
	let text = input.value.trim();

	// Якщо поле порожнє — нічого не робимо
	if (text === "") return;

	// Додаємо нову задачу в масив
	tasks.push({
		text: text,
		done: false,
		date: new Date().toLocaleDateString("uk-UA")
	});

	saveTasks();
	showTasks(currentFilter);

	input.value = "";
	showPopup("Задачу додано");
}

// Функція відображення задач
function showTasks(filter) {
	currentFilter = filter;
	list.innerHTML = "";

	// Якщо задач немає — показуємо підказку
	if (tasks.length === 0) {
		list.innerHTML = "<p class='empty'>Немає задач 👀</p>";
		updateProgress();
		return;
	}

	// Перебираємо всі задачі
	for (let i = 0; i < tasks.length; i++) {

		// Пропускаємо задачі що не відповідають фільтру
		if (filter === "active" && tasks[i].done)  continue;
		if (filter === "done"   && !tasks[i].done) continue;

		// Створюємо елемент <li>
		let li = document.createElement("li");
		if (tasks[i].done) li.classList.add("done");

		// Блок з текстом і датою
		let info = document.createElement("div");
		info.className = "task-info";

		let taskText = document.createElement("span");
		taskText.className = "task-text";
		taskText.textContent = tasks[i].text;

		let taskDate = document.createElement("span");
		taskDate.className = "task-date";
		taskDate.textContent = tasks[i].date;

		info.appendChild(taskText);
		info.appendChild(taskDate);

		// Кнопка "Виконано"
		let doneBtn = document.createElement("button");
		doneBtn.className = "done-btn";
		doneBtn.textContent = "✔";

		// Використовуємо замикання щоб зберегти індекс
		doneBtn.onclick = (function(index) {
			return function() {
				tasks[index].done = !tasks[index].done;
				saveTasks();
				showTasks(currentFilter);
				showPopup("Статус змінено");
			};
		})(i);

		// Кнопка "Видалити"
		let delBtn = document.createElement("button");
		delBtn.className = "delete-btn";
		delBtn.textContent = "✕";

		delBtn.onclick = (function(index) {
			return function() {
				tasks.splice(index, 1);
				saveTasks();
				showTasks(currentFilter);
				showPopup("Задачу видалено");
			};
		})(i);

		// Складаємо елемент
		li.appendChild(info);
		li.appendChild(doneBtn);
		li.appendChild(delBtn);
		list.appendChild(li);
	}

	updateProgress();
}

// Зберігаємо задачі в localStorage
function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Оновлюємо прогрес-бар
function updateProgress() {
	let done = 0;
	for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].done) done++;
	}

	let percent = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

	document.getElementById("progressFill").style.width = percent + "%";
	document.getElementById("progressText").textContent =
		percent + "% (" + done + "/" + tasks.length + ")";
}

// Активна кнопка фільтру
function setActive(btn) {
	let buttons = document.querySelectorAll(".filters button");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("active-filter");
	}
	btn.classList.add("active-filter");
}

// Очищення всіх задач
clearBtn.onclick = function() {
	if (confirm("Очистити всі задачі?")) {
		tasks = [];
		saveTasks();
		showTasks(currentFilter);
		showPopup("Всі задачі очищені");
	}
};

// Показуємо спливаюче повідомлення
function showPopup(text) {
	let popup = document.createElement("div");
	popup.className = "popup";
	popup.textContent = text;
	document.body.appendChild(popup);

	setTimeout(function() {
		popup.remove();
	}, 2000);
}
