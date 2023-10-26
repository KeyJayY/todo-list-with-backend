const containter = document.querySelector("#container");

containter.addEventListener("click", (e) => {
	if (
		e.target.tagName === "BUTTON" &&
		e.target.classList.contains("remove-button")
	)
		fetch(`/remove/${e.target.parentNode.getAttribute("data-id")}`, {
			method: "DELETE",
		}).then((response) => {
			if (response.ok) window.location.replace("/");
		});
	else if (
		e.target.tagName === "INPUT" &&
		e.target.getAttribute("type") === "checkbox"
	) {
		fetch(`/updateStatus/${e.target.parentNode.getAttribute("data-id")}`, {
			method: "PATCH",
		}).then((response) => {
			if (!response.ok)
				console.log("task status update have not saved to databese");
		});
	}
});
