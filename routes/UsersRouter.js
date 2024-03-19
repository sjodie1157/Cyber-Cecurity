import express from 'express';
import controller from '../controller/UserController.js';
import { verifyAToken } from '../middleware/Authenticate.js';

const router = express.Router();

// Router GET, Post, Delete, Patch for users
router.get('/', verifyAToken, controller.getUsers)
router.get('/:id', verifyAToken, controller.getSingleUser)
router.patch('/:id', verifyAToken, controller.updateUser)
router.delete('/:id' ,verifyAToken, controller.deleteUser)

// Exported router
export default router;