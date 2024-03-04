// Compare Password
// import { compare, hash } from 'bcrypt';

// Create Token When signed in
// import { createToken } from '../middleware/AuthenticateUsers.js';

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
            WHERE userID = ?;`[userID]);
        return result;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

export { getUsers, getSingleUser }