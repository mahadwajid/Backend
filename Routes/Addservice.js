import express from 'express';
import multer from 'multer';
import { createService, deleteService, getService, getServicebyid, updateService } from '../Controller/AddService.js';
import {auth} from '../middlewares/Authentication.js';


const router = express.Router();

const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null ,'./images/');
    },
    filename:function (req ,file, cb){
        cb(null , Date.now() + '-' + file.originalname);
    },
});

const upload= multer({storage : storage});

router.post('/',upload.single("image"), createService);

router.get('/', getService);

router.put('/:id',updateService);

router.delete("/:id",deleteService);

export default router;