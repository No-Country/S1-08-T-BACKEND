import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';


import pkg from 'body-parser';
const { json: _json, urlencoded: _urlencoded } = pkg;

import { config } from 'dotenv';


import userRouter from '../routers/userRouter/index.js';
import uploadRouter from '../routers/uploadRouter/index.js';


//dotenv
config();

//initializations
const app = express();
app.use(urlencoded({extended: true }));
app.use(json());
app.use(cors());


app.use(_json());
app.use(_urlencoded({extended: false})); 

//Middlewares
app.use(morgan('dev'));


//Routes

//users
app.use('/api/users', userRouter);



//uploads
app.use('/api/uploads', uploadRouter);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req,res)=>{
    res.send('Server ready');
});


app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message})
});


export default  app
