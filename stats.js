let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let allTasks = document.getElementById("allTasks");
let doneTasks = document.getElementById("doneTasks");
let activeTasks = document.getElementById("activeTasks");

let productivityText = document.getElementById("productivityText");
let statsProgress = document.getElementById("statsProgress");
let motivationText = document.getElementById("motivationText");

let total = tasks.length;

let done = 0;

for (let i = 0; i < tasks.length; i++) {
	if (tasks[i].done) {
		done++;
	}
}

let active = total - done;

let percent = total ? Math.round((done / total) * 100) : 0;


allTasks.textContent = total;
doneTasks.textContent = done;
activeTasks.textContent = active;

productivityText.textContent = percent + "%";

statsProgress.style.width = percent + "%";


if (percent == 100 && total > 0) {
	motivationText.textContent =
		"Ідеально! Всі задачі виконані 🔥";
}

else if (percent >= 50) {
	motivationText.textContent =
		"Хороший прогрес, продовжуй 💪";
}

else if (percent > 0) {
	motivationText.textContent =
		"Непоганий старт, рухайся далі 🚀";
}

else {
	motivationText.textContent =
		"Час почати працювати 😎";
}