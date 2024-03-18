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


// Replace local host link with firebase link when finished

// Middleware - Application level
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Request-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     res.header("Access-Control-Expose-Headers", "Authorization");
//     next();
// })

// app.use(cors({
//     origin: 'http://localhost:8080',
//     credentials: true
// }));

const allowedOrigins = ['http://localhost:8080'];

app.use(cors({
    origin: function (origin, callback) {
        // Check if the origin is allowed or if it's undefined (e.g., non-browser requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

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