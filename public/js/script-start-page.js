let todoLists;

window.onload = async () => {
	todoLists = (
		await fetch("/getTodoListsNames", {
			method: "GET",
		}).then((response) => response.json())
	).data;

	todoLists.sort();
	const list = document.querySelector("ul");
	list.innerHTML = "";

	todoLists.forEach((element) => {
		const node = document.createElement("a");
		node.href = `/${element}`;
		node.innerHTML = `<li>${element}</li>`;
		list.appendChild(node);
	});
};
document.querySelector("button").addEventListener("click", (e) => {
	fetch("/addTodoList", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name: document.querySelector("input").value }),
	});
	window.location.replace(document.URL + document.querySelector("input").value);
	e.preventDefault();
});
document.querySelector("input").addEventListener("input", async () => {
	const list = document.querySelector("ul");
	const text = document.querySelector("input").value;
	list.innerHTML = "";
	todoLists.forEach((element) => {
		if (element.includes(text)) {
			const node = document.createElement("a");
			node.href = `/${element}`;
			node.innerHTML = `<li>${element}</li>`;
			list.appendChild(node);
		}
	});
});
