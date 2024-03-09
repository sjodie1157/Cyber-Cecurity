// Imported from database functions
import { getUsers, getSingleUser, addUsers, updateUser, deleteUser, signIn, createToken } from '../models/DatabaseUsers.js'

// Imported verify a token
import { verifyAToken } from '../middleware/Authenticate.js';

// Imported Password Encryption
import hash from 'bcrypt'

export default {
    getUsers: async (req, res) => {
        try {
            const users = await getUsers();
            res.json(users);
        } catch (error) {
            console.error('Error getting users:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
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
            console.error("Error getting one user:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    addUsers: async (req, res) => {
        try {
            const { userEmail, userFirstName, userLastName, userPass } = req.body;
            const newUser = await addUsers(userEmail, userFirstName, userLastName, userPass);
            res.status(201).json(newUser);
        } catch (error) {
            console.error("Error adding user:", error.message);
            res.status(400).json({ error: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const existingUser = await getSingleUser(+req.params.id);
            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }

            const { userEmail, userFirstName, userLastName, userImg, userPass, userGender, userAge, userRole } = req.body;

            const updatedFields = {};
            if (userEmail) updatedFields.userEmail = userEmail;
            if (userFirstName) updatedFields.userFirstName = userFirstName;
            if (userLastName) updatedFields.userLastName = userLastName;
            if (userImg) updatedFields.userImg = userImg;
            if (userPass) updatedFields.userPass = await hash(userPass, 10);
            if (userGender) updatedFields.userGender = userGender;
            if (userAge) updatedFields.userAge = userAge;
            if (userRole) updatedFields.userRole = userRole;

            const updatedUser = await updateUser(req.params.id, updatedFields);
            res.json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await deleteUser(req.params.id);
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    signIn: async (req, res) => {
        const { userEmail, userPass } = req.body;

        try {
            if (!userEmail || !userPass) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            // Attempt to sign in the user
            const signInResult = await signIn(userEmail, userPass);

            // Check if the signInResult is falsy or if it does not contain a token
            if (!signInResult || !signInResult.token) {
                console.error("Invalid credentials. signInResult:", signInResult);
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Verify the token
            const verifiedToken = await verifyAToken(req, res);

            // Check if the token is not verified
            if (!verifiedToken) {
                console.error("Invalid token:", verifiedToken);
                throw new Error('Invalid token');
            }

            // If everything is okay, set the cookie and send the token and user data
            const { token, user } = signInResult;
            res.cookie('webtoken', token, { httpOnly: false });
            res.json({ token, user });

        } catch (error) {
            console.error("Error signing in:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },



    signOut: async (req, res) => {
        try {
            res.clearCookie('webtoken');
            res.json({ message: 'Successfully signed out' });
        } catch (error) {
            console.error("Error signing out:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
