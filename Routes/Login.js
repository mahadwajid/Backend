// src/routes/adminRoutes.js
import express from 'express';
import { loginAdmin } from '../Controller/Login.js';

const router = express.Router();

router.post('/', loginAdmin);

export default router;
