const listElement = document.querySelector("ul");
let currentTask;
let HTMLElementForEditing = document.createElement("li");
HTMLElementForEditing.classList.add("list-item");
HTMLElementForEditing.innerHTML =
	'<p class="task-name"><input type="text" style="width: 100%"/></p> <button id="accept-button">accept</button><button id="cancel-button">cancel</button>';

listElement.addEventListener("click", (e) => {
	switch (true) {
		case targetIsButton(e.target, "remove-button"):
			removeTask(e.target);
			break;
		case targetIsButton(e.target, "edit-button"):
			updateTask(e.target, e.currentTarget);
			break;
		case targetIsCheckbox(e.target):
			changeDoneStatus(e);
			break;
	}
});

const changeDoneStatus = (e) =>
	fetch(`/updateStatus/${e.target.parentNode.getAttribute("data-id")}`, {
		method: "PATCH",
	}).then((response) => {
		if (!response.ok)
			console.log("task status update have not saved to databese");
	});

const removeTask = (target) =>
	fetch(`/remove/${target.parentNode.getAttribute("data-id")}`, {
		method: "DELETE",
	}).then((response) => {
		if (response.ok) target.parentNode.remove();
	});

function updateTask(target, list) {
	currentTask = target.parentElement;
	HTMLElementForEditing.querySelector("input").value =
		currentTask.querySelector("p").innerText;
	list.insertBefore(HTMLElementForEditing, currentTask);
	currentTask.remove();
	document.querySelector("#accept-button").addEventListener("click", () => {
		list.insertBefore(currentTask, HTMLElementForEditing);
		currentTask.querySelector("p").innerText =
			HTMLElementForEditing.querySelector("input").value;
		HTMLElementForEditing.remove();
	});
	document.querySelector("#cancel-button").addEventListener("click", () => {
		list.insertBefore(currentTask, HTMLElementForEditing);
		HTMLElementForEditing.remove();
	});
	// target.parentNode.querySelector(
	// 	"p"
	// ).innerHTML = `<input type="text" value="${currentTask}"/>`;
}

const targetIsButton = (target, buttonName) =>
	target.tagName === "BUTTON" && target.classList.contains(buttonName);

const targetIsCheckbox = (target) =>
	target.tagName === "INPUT" && target.getAttribute("type") === "checkbox";
