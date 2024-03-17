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
            [userID, prodID]
        );

        return result.insertId;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};

// Remove specific item from cart
const removeFromCart = async (userID, prodID) => {
    try {
        const [existingProduct] = await pool.query(
            `SELECT quantity FROM Cart 
            WHERE userID = ? AND prodID = ?`,
            [userID, prodID]
        );

        if (existingProduct.length === 0) {
            throw new Error("Product not found in the cart.");
        }

        const currentQuantity = existingProduct[0].quantity;
        let removeMessage = '';

        if (currentQuantity > 1) {
            await pool.query(
                `UPDATE Cart 
                SET quantity = quantity - 1 
                WHERE userID = ? AND prodID = ?`,
                [userID, prodID]
            );
            removeMessage = "Quantity of the product decremented by one.";
        } else {
            await pool.query(
                `DELETE FROM Cart 
                WHERE userID = ? AND prodID = ?`,
                [userID, prodID]
            );
            removeMessage = "Product removed from the cart.";
        }
        return removeMessage;
    } catch (error) {
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
    GROUP BY p.prodID, p.prodName, p.prodPrice, p.prodImg;`, [userID]);
        return result;
    } catch (error) {
        console.error("Error getting cart items:", error);
        throw error;
    }
};

// Update cart items quantity
const updateCartQuantity = async (userID, prodID, quantity) => {
    try {
        const [result] = await pool.query(`
                UPDATE Cart 
                SET quantity = ? 
                WHERE userID = ? AND prodID = ?;
        `, [quantity, userID, prodID])
    } catch (error) {
        console.error("Error updating quantiy:", error);
        throw error;
    }
}

// Remove all cart items
const clearCart = async (userID) => {
    try {
        const [result] = await pool.query(`
        DELETE FROM Cart
        WHERE userID = ?;
        `, [userID])
    } catch (error) {
        console.error("Error updating quantiy:", error);
        throw error;
    }
}

export { addToCart, removeFromCart, getCartItems, updateCartQuantity, clearCart};
