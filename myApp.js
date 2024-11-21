require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");

let app = express();

const test = (req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
};

app.use("/public", express.static(__dirname + "/public"));
app.use(test);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		res.json({ message: "HELLO JSON" });
	} else {
		res.json({ message: "Hello json" });
	}
});

app.get(
	"/now",
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	}
);

app.get("/:word/echo", (req, res) => {
	res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
	const data = req.query;
	res.json({ name: `${data.first} ${data.last}` });
});

app.post("/name", (req, res) => {
	const data = req.body;
	res.json({ name: `${data.first} ${data.last}` });
});

module.exports = app;
