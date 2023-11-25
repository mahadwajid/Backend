import mongoose from 'mongoose';

const blogStructure = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    // publishDateTime: { type: Date, required: true },
    author: { type: String, required: true },
    authorImage: { 
      public_id:{
        type: String,
        required: true
      },
      url:{
        type: String,
        required: true
      } 
  },
    image:{
      public_id:{
        type: String,
        required: true
      },
      url:{
        type: String,
        required: true
      }
   }
   
  },
  {timestamps: true},
  
);

const BlogModel = mongoose.model('Blog', blogStructure);

export default BlogModel;

