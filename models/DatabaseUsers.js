// Compare Password
import { compare, hash } from 'bcrypt';

// Create Token When signed in
import { createToken } from '../middleware/Authenticate.js';

import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

// Connection to databse
const pool = createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    multipleStatements: true,
    connectionLimit: 30
});

// Get all users
const getUsers = async () => {
    try {
        const [result] = await pool.query(`
            SELECT userID, userEmail, userFirstName, userLastName, userImg, userPass, userGender, userAge, userRole
            FROM bfqjmxyo9asyeushukci.Users;`);
        return result;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

// Get one user
const getSingleUser = async (userID) => {
    try {
        const [result] = await pool.query(`
            SELECT userID, userEmail, userFirstName, userLastName, userImg, userPass, userGender, userAge, userRole
            FROM bfqjmxyo9asyeushukci.Users
            WHERE userID = ?`, [userID]);
        return result;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

// Add a user
const addUsers = async (userEmail, userFirstName, userLastName, userPass) => {
    try {
        // hash password
        let hashedPassword = await hash(userPass, 10);
        const [result] = await pool.query(`
            INSERT INTO
            bfqjmxyo9asyeushukci.Users
            (userEmail, userFirstName, userLastName, userPass)
            VALUES(?, ?, ?, ?);`,
            [userEmail, userFirstName, userLastName, hashedPassword]);
        const userID = result.insertId;
        let user = {
            userEmail,
            userPass: hashedPassword
        };
        return { user: await getSingleUser(userID) };
    } catch (error) {
        console.error("User Already exists", error);
        throw error;
    }
}

// Update a user
const updateUser = async (id, updatedFields) => {
    try {
        const [existUser] = await getSingleUser(id);

        if (!existUser) {
            throw new Error("User not found");
        }

        const setClause = Object.keys(updatedFields).map(field => `${field} = ?`).join(', ');

        const params = [...Object.values(updatedFields), id];

        const [User] = await pool.query(
            `UPDATE bfqjmxyo9asyeushukci.Users
            SET ${setClause}
            WHERE userID = ?`,
            params
        );
        let user = {
            userEmail: updatedFields.userEmail,
            userPass: updatedFields.userPass
        };
        return { user: await getSingleUser(id) };
    } catch (error) {
        console.error("Error updating User:", error);
        throw error;
    }
};

// Delete a user
const deleteUser = async (id) => {
    const [User] = await pool.query(`
        DELETE FROM bfqjmxyo9asyeushukci.Users 
        WHERE userID = ?`, [id]);
    return getUsers(User);
};

// Sign in logic
const signIn = async (userEmail, userPass) => {
    try {
        if (!userEmail || !userPass) {
            throw new Error('Email or password cannot be empty');
        }

        const [users] = await pool.query(`
            SELECT userID, userEmail, userFirstName, userLastName, userImg, userPass, userGender, userAge, userRole 
            FROM bfqjmxyo9asyeushukci.Users
            WHERE userEmail = ?`, [userEmail]);

        const user = users[0];

        if (!user) {
            throw new Error('User not found');
        }

        const match = await compare(userPass, user.userPass);

        if (!match) {
            throw new Error('Incorrect password');
        }

        const token = createToken({ userEmail, userPass, userFirstName, userRole });
        return { token, user };
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};
export { getUsers, getSingleUser, addUsers, updateUser, deleteUser, signIn }