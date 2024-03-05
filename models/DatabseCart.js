import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

// Connection to database
const pool = createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    multipleStatements: true,
    connectionLimit: 30
});

// Adding to cart
const addToCart = async (userID, prodID) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO Cart (userID, prodID, quantity) 
            VALUES(?, ?, 1)`,
            [userID[0], prodID]
        );

        return result.insertId;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};

// Remove item from cart
const removeFromCart = async (userID, prodID) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM Cart WHERE userID = ? AND prodID = ?`,
            [userID[0], prodID]
        );

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
};

// Get cart items
const getCartItems = async (userID) => {
    try {
        const [result] = await pool.query(`
    SELECT p.prodID, p.prodName, p.prodPrice, p.prodImg, 
    SUM(c.quantity) AS totalQuantity,(p.prodPrice * SUM(c.quantity)) AS totalPrice
    FROM Products p
    LEFT JOIN Cart c ON p.prodID = c.prodID
    WHERE c.userID = ?
    GROUP BY p.prodID, p.prodName, p.prodPrice, p.prodImg;`,[userID[0]]);
        return result;
    } catch (error) {
        console.error("Error getting cart items:", error);
        throw error;
    }
};




export { addToCart, removeFromCart, getCartItems };
