import express from 'express';
import { createPatient, deletePatient, getPatientData, updatePatient } from '../Controller/Patientdata.js';

const router=express.Router();

router.post('/',createPatient);
router.get('/',getPatientData);
router.delete('/:id',deletePatient);
router.put('/:id',updatePatient);


export default router;