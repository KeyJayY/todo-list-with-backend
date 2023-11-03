document.querySelector("button").addEventListener("click", (e) => {
	window.location.replace(document.URL + document.querySelector("input").value);
	e.preventDefault();
});
