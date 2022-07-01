import express, { NextFunction } from 'express';
import config from './config';
import cors from 'cors';
import home from './api/Routes/HomeRouter';
import authors from './api/Routes/AuthorRouter';

const app = express();

// middleware: set default author id if not provided
app.use((req: any, res: any, next: NextFunction) => {
    const idAuthor: number = parseInt(req.path.split('/')[2]);
    console.log(idAuthor);
    req.idAuthor = idAuthor 
    if (isNaN(idAuthor)) {
        req.idAuthor = 1
    }
    next();
});

if( config.env !== "prod"){
    app.use(cors())
}

app.use('/', home)
app.use('/authors', authors)

export default app;