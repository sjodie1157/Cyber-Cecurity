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



// Get all Items
const getItems = async () => {

    try {
        const [result] = await pool.query(`
            SELECT prodID, prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity
            FROM bfqjmxyo9asyeushukci.Products;`);
        return result;
    } catch (error) {
        console.error("Error getting Items:", error);
        throw error
    }
};

// Get one Item
const getSingleItem = async (prodID) => {
    try {
        const [result] = await pool.query(`
            SELECT prodID, prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity
            FROM bfqjmxyo9asyeushukci.Products
            WHERE prodID = ?`, [prodID]);
        return result;
    } catch (error) {
        console.error("Error getting Items:", error);
        throw error;
    }
};

// Add an Item
const addItem = async (prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity) => {
    try {
        const [result] = await pool.query(`
            INSERT INTO Products ( prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity)
            VALUES( ?, ?, ?, ?, ?, ?);`
            , [prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity]);
        const prodID = result.insertId;
        let item = {
            prodName,
            prodPrice,
            prodDescription,
            prodImg,
            prodCategory,
            prodQuantity
        };
        return { item: await getSingleItem(prodID) };
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

// Patch an item
const updateItem = async (id, updatedFields) => {
    try {
        const [existItem] = await getSingleItem(id);

        if (!existItem) {
            throw new Error("Item not found");
        }

        const setClause = Object.keys(updatedFields).map(field => `${field} = ?`).join(', ');

        const params = [...Object.values(updatedFields), id];

        const [Item] = await pool.query(
            `UPDATE bfqjmxyo9asyeushukci.Products
            SET ${setClause}
            WHERE ProdID = ?`,
            params
        );
        return { item: await getSingleItem(id) };
    } catch (error) {
        console.error("Error updating an Item:", error);
        throw error;
    }
};

// Delete an Item
const deleteItem = async (id) => {
    const [item] = await pool.query(`
        DELETE FROM bfqjmxyo9asyeushukci.Products 
        WHERE prodID = ?`, [id]);
    return getItems(item);
};

export { getItems, getSingleItem, addItem, updateItem, deleteItem }