import { getCartItems,removeFromCart,addToCart } from "../models/DatabseCart.js";

export default {
    getCartItems: async (req, res) => {
        try {
            const cartItems = await getCartItems()
            res.json(cartItems)
        } catch (error) {
            console.error('Error getting Items in cart');
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    removeFromCart: async (req, res) => {
        try {
            const deletedCartItem = await removeFromCart(req.params.id);
            res.json({ message: "Item deleted successfully" }); 
        } catch (error) {
            console.error("Error deleting Item From Cart:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    addToCart: async (req, res) => {
        try {
            const { userID, productID, quantity } = req.body;
            const newItemId = await addToCart(userID, productID, quantity); 
            res.status(201).json({ message: "Item added to cart successfully", newItemId });
        } catch (error) {
            console.error("Error adding item:", error);
            res.status(400).json({ error: error.message });
        }
    }
}