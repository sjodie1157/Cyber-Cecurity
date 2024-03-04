import express from 'express';
import controller from '../controller/UserController.js';

const router = express.Router();


// Router GET, Post, Delete, Patch for users
router.get('/', controller.getUsers);
router.get('/:id', controller.getSingleUser);

// Exported router
export default router;