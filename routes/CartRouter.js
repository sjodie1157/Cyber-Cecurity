import express from 'express';
import controller from '../controller/CartController.js';

const router = express.Router();

// GET cart items for a specific user
router.get('/:id', controller.getCartItems);

// DELETE item from cart for a specific user
router.delete('/:id', controller.removeFromCart);

// POST add item to cart for a specific user
router.post('/:id', controller.addToCart);

export default router;
