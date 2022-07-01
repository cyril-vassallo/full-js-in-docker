import express, { NextFunction } from 'express';
import { getAuthors, getAuthor } from '../Controllers/AuthorController';
const router = express.Router();



/**
* GET request to /authors
 */
router.get('/', (req:any, res:any, next: NextFunction) => {
    res.status(200).json(
        getAuthors()
    );
});



/**
 * GET request to /authors/:id
 */
router.get('/:id', (req: any, res: any, next: NextFunction) => {
    res.status(200).json(getAuthor(parseInt(req.params.id)));
});


export default router;
