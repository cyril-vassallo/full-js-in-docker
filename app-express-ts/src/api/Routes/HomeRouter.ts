import express from 'express';
import { home }  from '../Controllers/HomeController'


const router =  express.Router();

router.get('/', function(req: any , res: any){
    res.status(200).json(home(req.idAuthor));
});

export default router;