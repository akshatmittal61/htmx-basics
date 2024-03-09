import { sleep } from "../utils/functions.js";

export const getAllUsers = async (req, res) => {
	try {
		const limit = +(req.query.limit || 10);
		const users = await fetch(
			`https://jsonplaceholder.typicode.com/users?_limit=${limit}`
		)
			.then((res) => res.json())
			.then((data) => data);
		await sleep(2500);
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
