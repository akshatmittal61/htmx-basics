import { sleep } from "../utils/functions.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((data) => data);
		await sleep(5000);
		return res.status(200).send(`
            <h1>Users</h1>
            <ul>
                ${users.map((user) => `<li>${user.name}</li>`).join("")}
            </ul>
        `);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
