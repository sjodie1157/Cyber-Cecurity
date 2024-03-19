import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UsersRouter from './routes/UsersRouter.js';
import ItemsRouter from './routes/ItemsRouter.js';
import CartRouter from './routes/CartRouter.js';
import SigninRouter from './routes/SigninRouter.js';
import UserRegisterRouter from './routes/UserRegister.js';

const app = express();
const port = process.env.PORT || 4500;

// Middleware to enable CORS with appropriate options
app.use(cors({
    origin: 'http://localhost:8080', // Allow requests from this origin
    credentials: true // Include credentials in CORS request
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Serve static files from the 'static' directory
app.use(express.static('./static'));

// Routes
app.use('/User', UsersRouter);
app.use('/Register', UserRegisterRouter);
app.use('/Items', ItemsRouter);
app.use('/Cart', CartRouter);
app.use('/login', SigninRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
