import express from 'express'
// import config from 'dotenv'

// User Router Import
import UsersRouter from './routes/UsersRouter.js';

// Item Router Import
import ItemsRouter from './routes/ItemsRouter.js'

// Cart Router Import
import CartRouter from './routes/CartRouter.js'

// Signin Router Import
import signinRouter from './routes/SigninRouter.js'

// User Register Router Import
import UserRegisterRouter from './routes/UserRegister.js'

import cors from 'cors'
import cookieParser from 'cookie-parser'


const port = process.env.PORT || 4500;
const app = express();



app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true, // Add this line if you want to include credentials
    exposedHeaders: 'authorization' // Add this line to expose headers
}));

// This middleware is not needed as the CORS middleware takes care of it.

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});


app.use(express.json());
app.use(cookieParser());
app.use(express.static('./static'));

app.use('/User', UsersRouter);
app.use('/Register', UserRegisterRouter);
app.use('/Items', ItemsRouter);
app.use('/Cart', CartRouter);
app.use('/login', signinRouter);

// local host listener
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});