// import config from 'dotenv'
import express from 'express'

// User Router Import
import UsersRouter from './routes/UsersRouter.js';

// Item Router Import
import ItemsRouter from './routes/ItemsRouter.js'

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

// local host listener
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});