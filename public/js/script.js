const containter = document.querySelector("#container");

// let data = { dsc: "test", num: 1 };
// fetch("/test", {
// 	method: "POST",
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// 	body: JSON.stringify(data),
// });

containter.addEventListener("click", (e) => {
	if (
		e.target.tagName == "BUTTON" &&
		e.target.classList.contains("remove-button")
	)
		fetch(`/remove/${e.target.getAttribute("data-id")}`, {
			method: "DELETE",
		}).then((response) => {
			if (response.ok) window.location.replace("/");
		});
});
