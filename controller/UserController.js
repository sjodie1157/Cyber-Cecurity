// Imported from database functions
import { getUsers, getSingleUser } from '../models/DatabaseUsers.js'

// Imported Password Encryption
// import bcrypt from 'bcrypt'

export default {
    getUsers: async (req, res) => {
        try {
            const users = await getUsers();
            res.json(users);
        } catch (error) {
            console.error('Error getting users');
            res.status(500).json({ error: 'Internal Server Errror' });
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const user = await getSingleUser(+req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error("Error getting one user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
}