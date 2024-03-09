import users from "../data/users.js";

export const getAllUsers = async (req, res) => {
	try {
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
