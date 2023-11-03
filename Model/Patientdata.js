import mongoose from "mongoose";

const patientStructure = mongoose.Schema({
    patientname: { type: String, required: true },
    date: { type: Date, required: true },
    patientaddress:{type: String , required: true},
    patientphoneno:{type: String , required: true},
    co: { type: String, required: true },
    investigation: {
        bloodSugar: String,
        hba1c: String,
        serumCreatinine: String,
        urine: String,
        protein: String,
    },
    treatment: { type: String, required: true },
    followup: { type: String, required: true },
});

const PatientModel = mongoose.model('Patient', patientStructure);

export default PatientModel;
