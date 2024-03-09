import express from "express";
import { PORT } from "./config/index.js";
import routes from "./routes/index.js";
import { sleep } from "./utils/functions.js";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
	return res.status(200).sendFile("/index.html");
});

["temperature", "polling", "search"].forEach((route) => {
	app.get(`/${route}`, async (req, res) => {
		const file = await fetch(`http://localhost:${PORT}/${route}.html`)
			.then((res) => res.text())
			.then((data) => data);
		return res.status(200).send(file);
	});
});

app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "Server is running" });
});

app.use("/api", routes);

app.post("/convert", async (req, res) => {
	await sleep(2000);
	const c = parseFloat(req.body.celsius);
	const f = (c * 9) / 5 + 32;
	return res.status(200).send(`
        <h1>Temperature Conversion</h1>
        <p>${c.toFixed(2)}°C is ${f.toFixed(2)}°F</p>
    `);
});

let counter = 0;

app.get("/poll", async (req, res) => {
	await sleep(2000);
	counter++;
	return res.status(200).json({ counter });
});

app.post("/api/search", async (req, res) => {
	const { query } = req.body;
	const data = await fetch("https://jsonplaceholder.typicode.com/users")
		.then((res) => res.json())
		.then((data) => data)
		.catch((err) => {
			console.log(err);
			return [];
		});
	const users = data.filter(
		(user) =>
			user.name.toLowerCase().includes(query.toLowerCase()) ||
			user.email.toLowerCase().includes(query.toLowerCase())
	);
	if (users.length === 0) {
		return res.status(200).send(`
            <tr>
                <td colspan="2">No results found</td>
            </tr>
        `);
	}
	return res.status(200).send(`
        ${users
			.map(
				(post) => `
            <tr>
                <td>${post.name}</td>
                <td>${post.email}</td>
            </tr>
        `
			)
			.join("")}
    `);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
