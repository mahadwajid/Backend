import PatientModel from '../Model/Patientdata.js';

export const createPatient = async (req, res) => {
    const {
        patientname,
        date,
        co,
        patientaddress,
        patientphoneno,
        bloodSugar,
        hba1c,
        serumCreatinine,
        urine,
        protein,
        treatment,
        followup
    } = req.body;

    try {
        const newPatient = PatientModel({
            patientname,
            date,
            patientaddress,
            patientphoneno,
            co,
            investigation: {
                bloodSugar,
                hba1c,
                serumCreatinine,
                urine,
                protein,
            },
            treatment,
            followup
        });

        const savedData = await newPatient.save();
        console.log(savedData);

        res.json({ Response: true, message: 'Added Successfully ' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Response: false, message: 'Server Error' });
    }
};


export const getPatientData = async (req , res) =>{
    try {
        const Patient= await PatientModel.find();
        res.status(200).json(Patient);
        
    } catch (error) {
     console.error('Error getting blogs:', error);
     res.status(500).json({ error: 'Internal server error' });
    }
}

export const deletePatient = async (req , res ) =>{
    try{
      const {id} = req.params;
      await PatientModel.findByIdAndDelete(id);
      res.json({message:'Delete Successfully'});
    }catch(error){
      res.status(500).json({error:'Internal Server Error'});
    }
  }

  export const updatePatient = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        const updatedPatient = await PatientModel.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );

        if (updatedPatient) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

  