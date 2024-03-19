import express from 'express';
import controller from '../controller/ItemController.js';
import { verifyAToken } from '../middleware/Authenticate.js';
import { verifyAdminToken } from '../middleware/Authenticate.js';
const router = express.Router();

// Router GET, Post, Delete, Patch for Items
router.get('/', verifyAToken, controller.getItems)
router.get('/:id', verifyAToken, controller.getSingleItem)
router.post('/', verifyAdminToken, controller.addItem)
router.patch('/:id', verifyAdminToken, controller.updateItem)
router.delete('/:id', verifyAdminToken, controller.deleteItem)
export default router