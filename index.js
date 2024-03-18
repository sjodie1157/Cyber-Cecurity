import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import UsersRouter from './routes/UsersRouter.js';
import ItemsRouter from './routes/ItemsRouter.js';
import CartRouter from './routes/CartRouter.js';
import signinRouter from './routes/SigninRouter.js';
import UserRegisterRouter from './routes/UserRegister.js';

dotenv.config(); // Load environment variables

const port = process.env.PORT || 4500;
const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./static'));

// Middleware - Application level
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

app.use('/users', UsersRouter); // Change to '/users' if this router handles user-related routes
app.use('/register', UserRegisterRouter); // Change to '/register' if this router handles registration
app.use('/items', ItemsRouter); // Change to '/items' if this router handles items-related routes
app.use('/cart', CartRouter); // Change to '/cart' if this router handles cart-related routes
app.use('/login', signinRouter); // Change to '/login' if this router handles login-related routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
