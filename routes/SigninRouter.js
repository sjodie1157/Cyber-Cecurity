import express from 'express';
import controller from '../controller/UserController.js';
import cors from "cors"

const router = express.Router();

const app = express();

// Enable CORS
app.use(cors());

// Router GET, Post, Delete, Patch for users
router.post('/', controller.signIn);

// Exported router
export default router;