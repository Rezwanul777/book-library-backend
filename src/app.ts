import express, { Application } from 'express';
import cors from 'cors';


import router from './routes';
import errorHandler from './middleware/errorhandeller';



const app:Application = express();

//middleware
app.use(express.json());

app.use(cors(
    {
        origin: 'https://book-frontend-nu.vercel.app',
       
        credentials: true
    }
))
app.use(express.urlencoded({ extended: true }));

//router connect
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// error middleware
app.use(errorHandler);

export default app;