import { getItems, getSingleItem, addItem, updateItem, deleteItem } from "../models/DatabaseItems.js";

// import { verifyAToken } from "../middleware/Authenticate.js";

// function getUser(token) {
//     let user = token.split('.').at(1);
//     return JSON.parse(atob(user))
// }

export default {
    getItems: async (req, res) => {
        // let token = req.headers['authorization'];
        // console.log(token)

        // let user = getUser(token);
        // verifyAToken(req, res)
        // console.log('user: ', user);
        try {
            const items = await getItems()
            res.json(items)
        } catch (error) {
            console.error('Error getting Items');
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    getSingleItem: async (req, res) => {
        try {
            const item = await getSingleItem(+req.params.id);
            if (!item) {
                return res.status(404).json({ error: "Item not found" });
            }
            res.json(item);
        } catch (error) {
            console.error("Error getting one item:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    addItem: async (req, res) => {
        try {
            const { prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity } = req.body;
            const newItem = await addItem(prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity);
        } catch (error) {
            console.error("Error adding item:", error);
            res.status(400).json({ error: error.message });
        }
    },
    updateItem: async (req, res) => {
        try {
            const existingItem = await getSingleItem(+req.params.id);
            if (!existingItem) {
                return res.status(404).json({ error: "Item not found" });
            }

            const { prodName, prodPrice, prodDescription, prodImg, prodCategory, prodQuantity } = req.body;

            const updatedFields = {};
            if (prodName) updatedFields.prodName = prodName;
            if (prodPrice) updatedFields.prodPrice = prodPrice;
            if (prodDescription) updatedFields.prodDescription = prodDescription;
            if (prodImg) updatedFields.prodImg = prodImg;
            if (prodCategory) updatedFields.prodCategory = prodCategory;
            if (prodQuantity) updatedFields.prodQuantity = prodQuantity;

            const updatedItem = await updateItem(req.params.id, updatedFields);
            res.json(updatedItem);
        } catch (error) {
            console.error("Error updating an Item:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    deleteItem: async (req, res) => {
        try {
            const deletedItem = await deleteItem(req.params.id);
            res.json({ message: "Item deleted successfully" });
        } catch (error) {
            console.error("Error deleting Item:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
}