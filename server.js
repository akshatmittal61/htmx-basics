import express from "express";
import { PORT } from "./config/index.js";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

app.get("/health", (req, res) => {
	res.status(200).json({ message: "Server is running" });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
