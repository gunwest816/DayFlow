// Отримуємо кнопку теми
let themeBtn = document.getElementById("themeBtn");

// Якщо в localStorage збережена світла тема — вмикаємо її
if (localStorage.getItem("theme") === "light") {
	document.body.classList.add("light-theme");
	themeBtn.textContent = "☀️";
}

// При кліку на кнопку — перемикаємо тему
themeBtn.onclick = function() {
	document.body.classList.toggle("light-theme");

	if (document.body.classList.contains("light-theme")) {
		localStorage.setItem("theme", "light");
		themeBtn.textContent = "☀️";
	} else {
		localStorage.setItem("theme", "dark");
		themeBtn.textContent = "🌙";
	}
};
