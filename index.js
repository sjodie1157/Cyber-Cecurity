import express from 'express'
// import config from 'dotenv'

// User Router Import
import UsersRouter from './routes/UsersRouter.js';

// Item Router Import
import ItemsRouter from './routes/ItemsRouter.js'

// Cart Router Import
import CartRouter from './routes/CartRouter.js'

import cors from 'cors'
import cookieParser from 'cookie-parser'


const port = process.env.PORT || 4500;
const app = express();


// Replace local host link with firebase link when finished

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./static'));

app.use('/Users', UsersRouter);
app.use('/Items', ItemsRouter);
app.use('/Cart', CartRouter);

// local host listener
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});