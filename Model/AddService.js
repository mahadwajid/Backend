import mongoose from 'mongoose';


const ServiceStructure = mongoose.Schema(
    {
      title: { type: String, required: true },
      Content: { type: String, required: true },
    
    //   image:{
    //     public_id:{
    //       type: String,
    //       required: true
    //     },
    //     url:{
    //       type: String,
    //       required: true
    //     }
    //  }
    image:{
      type: String,
    }
     
    }
    
  );
  
  const ServiceModel = mongoose.model('Add Service', ServiceStructure);
  
  export default ServiceModel;