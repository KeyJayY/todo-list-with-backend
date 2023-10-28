const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todolist");

const taskSchema = new mongoose.Schema({
	description: String,
	status: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// sendFile will go here
app.get("/", async (req, res) => {
	let data = await Task.find();
	res.render("index.ejs", { data: data });
});

app.post("/add", async (req, res) => {
	const task = new Task({ description: req.body.dsc, status: false });
	await task.save();
	res.redirect("/");
});

app.delete("/remove/:id", async (req, res) => {
	await Task.deleteOne({ _id: req.params.id });
	res.end();
});

app.patch("/updateStatus/:id", async (req, res) => {
	const currentStatus = await Task.findOne({ _id: req.params.id });
	await Task.findByIdAndUpdate(req.params.id, {
		status: !currentStatus.status,
	});
	res.end();
});

app.patch("/updateTask/:id", async (req, res) => {
	await Task.findByIdAndUpdate(req.params.id, {
		description: req.body.description,
	});
	res.end();
});

app.listen(port, () => console.log(`server is running on port: ${port}`));
