import express from 'express';
import { getServicebyid } from '../Controller/AddService.js';

const router = express.Router();

router.get("/:id",getServicebyid);

export default router;