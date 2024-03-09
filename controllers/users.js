import users from "../data/users.js";

export const getAllUsers = async (req, res) => {
	try {
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
