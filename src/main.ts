import express from 'express';
import cors from 'cors'
import  router from './routes/routes';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(router);



export default app;