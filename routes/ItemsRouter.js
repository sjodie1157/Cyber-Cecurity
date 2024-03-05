import express from 'express';
import controller from '../controller/ItemController.js';

const router = express.Router();

// Router GET, Post, Delete, Patch for Items
router.get('/', controller.getItems)
router.get('/:id', controller.getSingleItem)
router.post('/', controller.addItem)
router.patch('/:id', controller.updateItem)
router.delete('/:id',controller.deleteItem)
export default router