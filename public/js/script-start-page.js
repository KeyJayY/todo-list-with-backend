document.querySelector("button").addEventListener("click", () => {
	window.location.replace(document.URL + document.querySelector("input").value);
});
