const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todolist");

const taskSchema = new mongoose.Schema({
	description: String,
	status: Boolean,
});

app.get("/", async (req, res) => {
	res.render("index.ejs");
});

app.get("/:collection", async (req, res) => {
	const Task = mongoose.model("Task" + req.params.collection, taskSchema);
	let data = await Task.find();
	res.render("todolist.ejs", { data: data, collection: req.params.collection });
});

app.post("/:collection/add", async (req, res) => {
	const Task = mongoose.model("Task" + req.params.collection, taskSchema);
	const task = new Task({ description: req.body.dsc, status: false });
	await task.save();
	res.redirect("/" + req.params.collection);
});

app.delete("/:collection/remove", async (req, res) => {
	const Task = mongoose.model("Task" + req.params.collection, taskSchema);
	await Task.deleteOne({ _id: req.headers.id });
	res.end();
});

app.patch("/:collection/updateStatus", async (req, res) => {
	const Task = mongoose.model("Task" + req.params.collection, taskSchema);
	const currentStatus = await Task.findOne({ _id: req.headers.id });
	await Task.findByIdAndUpdate(req.headers.id, {
		status: !currentStatus.status,
	});
	res.end();
});

app.patch("/:collection/updateTask", async (req, res) => {
	const Task = mongoose.model("Task" + req.params.collection, taskSchema);
	await Task.findByIdAndUpdate(req.headers.id, {
		description: req.body.description,
	});
	res.end();
});

app.listen(port, () => console.log(`server is running on port: ${port}`));
