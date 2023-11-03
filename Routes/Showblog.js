import express from 'express';
import { getblogbyid } from '../Controller/Addblogs.js';


const router = express.Router();

router.get("/:id",getblogbyid);

export default router;