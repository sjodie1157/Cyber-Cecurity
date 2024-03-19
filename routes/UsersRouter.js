import express from 'express';
import controller from '../controller/UserController.js';
import { verifyAToken } from '../middleware/Authenticate.js';
import { verifyAdminToken } from '../middleware/Authenticate.js';

const router = express.Router();

// Router GET, Post, Delete, Patch for users
router.get('/', verifyAdminToken, controller.getUsers)
router.get('/:id', verifyAdminToken, controller.getSingleUser)
router.patch('/:id', verifyAdminToken, controller.updateUser)
router.delete('/:id' ,verifyAToken, controller.deleteUser)

// Exported router
export default router;