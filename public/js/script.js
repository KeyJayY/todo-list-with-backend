const list = document.querySelector("ul");
let currentTask;
const HTMLElementForEditing = document.createElement("li");

list.addEventListener("click", (e) => {
	switch (true) {
		case targetIsButton(e.target, "remove-button"):
			removeTask(e.target);
			break;
		case targetIsButton(e.target, "edit-button"):
			updateTask(e.target);
			break;
		case targetIsCheckbox(e.target):
			changeDoneStatus(e);
			break;
	}
});

const changeDoneStatus = async (e) =>
	fetch(`/updateStatus/${e.target.parentNode.getAttribute("data-id")}`, {
		method: "PATCH",
	})
		.then((res) => {
			if (!res.ok) console.log("failed to connect to api ");
		})
		.catch((error) => {
			console.log("failed to connect to api ", error);
		});

const removeTask = (target) =>
	fetch(`/remove/${target.parentNode.getAttribute("data-id")}`, {
		method: "DELETE",
	}).then((response) => {
		if (response.ok) target.parentNode.remove();
	});

function updateTask(target) {
	currentTask = target.parentElement;
	HTMLElementForEditing.querySelector("input").value =
		currentTask.querySelector("p").innerText;
	list.insertBefore(HTMLElementForEditing, currentTask);
	currentTask.remove();
}

const sendUpdateToBackend = (data) => {
	fetch(`/updateTask/${currentTask.getAttribute("data-id")}`, {
		method: "PATCH",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
};

const targetIsButton = (target, buttonName) =>
	target.tagName === "BUTTON" && target.classList.contains(buttonName);

const targetIsCheckbox = (target) =>
	target.tagName === "INPUT" && target.getAttribute("type") === "checkbox";

HTMLElementForEditing.classList.add("list-item");
HTMLElementForEditing.innerHTML =
	'<p class="task-name"><input type="text" style="width: 100%"/></p> <button id="accept-button">accept</button><button id="cancel-button">cancel</button>';
HTMLElementForEditing.querySelector("#accept-button").addEventListener(
	"click",
	() => {
		list.insertBefore(currentTask, HTMLElementForEditing);
		currentTask.querySelector("p").innerText =
			HTMLElementForEditing.querySelector("input").value;
		HTMLElementForEditing.remove();
		sendUpdateToBackend({
			description: currentTask.querySelector("p").innerText,
		});
	}
);
HTMLElementForEditing.querySelector("#cancel-button").addEventListener(
	"click",
	() => {
		list.insertBefore(currentTask, HTMLElementForEditing);
		HTMLElementForEditing.remove();
	}
);
