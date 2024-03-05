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

// Adding to cart
const addToCart = async (userID, productID, quantity) => {
    try {
        const [result] = await pool.query(`
            INSERT INTO Cart (userID, productID, quantity)
            VALUES (?, ?, ?)`,
            [userID, productID, quantity]);

        return result.insertId;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};

// Remove item from cart
const removeFromCart = async (userID, prodID) => {
    try {
        const [result] = await pool.query(`
            DELETE FROM Cart
            WHERE userID = ? AND prodID = ?`,
            [userID, prodID]);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
};

const getCartItems = async (userID) => {
    try {
        const [result] = await pool.query(`
            SELECT p.prodID, p.prodName, p.prodPrice, c.quantity
            FROM Products p
            LEFT JOIN Cart c ON p.prodID = c.prodID
            WHERE c.userID = ?`,
            [userID]);

        return result;
    } catch (error) {
        console.error("Error getting cart items:", error);
        throw error;
    }
};

export { addToCart, removeFromCart, getCartItems}