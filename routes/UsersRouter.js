import express from 'express';
import controller from '../controller/UserController.js';

const router = express.Router();

// Router GET, Post, Delete, Patch for users
router.get('/', controller.getUsers);
router.get('/:id', controller.getSingleUser);
router.post('/', controller.addUsers)
router.patch('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)

// Exported router
export default router;