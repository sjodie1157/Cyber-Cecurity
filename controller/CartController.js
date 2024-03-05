import { getCartItems,removeFromCart,addToCart } from "../models/DatabseCart.js";

export default {
    getCartItems: async (req, res) => {
        try {
            const userID = req.params.id;
            const cartItems = await getCartItems(userID);
            res.json(cartItems);
        } catch (error) {
            console.error("Error getting cart items:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userID = req.params.id;
            const { prodID, quantity } = req.body;
            const deletedFromCart = await removeFromCart(userID, prodID, quantity);
            res.json({ message: "Item deleted successfully" }); 
        } catch (error) {
            console.error("Error deleting Item From Cart:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    addToCart: async (req, res) => {
        try {
            const userID = req.params.id;
            const { prodID, quantity } = req.body;
            const newItemId = await addToCart(userID, prodID, quantity); 
            res.status(201).json({ message: "Item added to cart successfully", newItemId });
        } catch (error) {
            console.error("Error adding item:", error);
            res.status(400).json({ error: error.message });
        }
    }
}