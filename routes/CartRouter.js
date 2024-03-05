import express from 'express';

import controller from '../controller/CartController.js';

const router = express.Router();

// Router GET, Post, Delete, Patch for Cart

router.get('/', controller.getCartItems)
router.delete('/:id', controller.removeFromCart)
router.post('/', controller.addToCart)

export default router