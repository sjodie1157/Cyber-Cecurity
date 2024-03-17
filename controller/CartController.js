import { getCartItems, removeFromCart, addToCart, updateCartQuantity, clearCart } from "../models/DatabseCart.js";

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
            const { prodID } = req.body;
            const removeMessage = await removeFromCart(userID, prodID);
            res.json({ message: removeMessage });
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
    },

    updateCartQuantity : async (req, res) => {
        try {
            const userID = req.params.id;
            const { prodID, quantity } = req.body;
            await updateCartQuantity(userID, prodID, quantity);
            res.status(200).json({ message: "Cart quantity updated successfully" }); 
        } catch (error) {
            console.error("Error updating item quantity:", error);
            res.status(400).json({ error: error.message });
        }
    },
    clearCart : async (req, res) => {
        try {
            const userID = req.params.id;
            await clearCart(userID);
            res.status(200).json({ message: "Cart cleared successfully" }); 
        } catch (error) {
            console.error("Error updating item quantity:", error);
            res.status(400).json({ error: error.message });
        }
    }
}