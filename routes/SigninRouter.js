import express from 'express';
import controller from '../controller/UserController.js';

const router = express.Router();

// Router GET, Post, Delete, Patch for users
router.post('/', controller.signIn);

// Exported router
export default router;