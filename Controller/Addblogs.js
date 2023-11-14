import BlogModel from '../Model/Addblog.js';
import cloudinary from '../cloudinaryConfig.js';

export const createBlog = async (req, res) => {
  const { title, content, publishDate, author } = req.body;

  try {
    const imageUploadResult = await cloudinary.uploader.upload(req.files['image'][0].path, {
      folder: "blogs",
    });

    const authorImageUploadResult = await cloudinary.uploader.upload(req.files['authorImage'][0].path, {
      folder: "blogs",
    });

    const newBlog = new BlogModel({
      title,
      author,
      content,
      publishDateTime: new Date(publishDate),
      authorImage: {
        public_id: authorImageUploadResult.public_id,
        url: authorImageUploadResult.secure_url
      },
      image: {
        public_id: imageUploadResult.public_id,
        url: imageUploadResult.secure_url
      },
    });

    const savedProduct = await newBlog.save();
    console.log(savedProduct);

    res.json({ Response: true, message: 'Added Successfully' });
    console.log("Blog added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ Response: false, message: 'Internal Server Error' });
  }
};


// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
    
  } catch (error) {
    console.error('Error getting blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getblogbyid = async (req, res) =>{
  try{
    const { id } = req.params; 
    const blog = await BlogModel.findById(id); 
    if(!blog){
      return res.status(404).json({message:"Not Found"})
    }
    res.json(blog);
  }catch(error){
    console.log("Error...",error);
    res.status(500).json({message:"Error Internal server"});
  }
};

export const deleteblog = async (req , res ) =>{
  try{
    const {id} = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.json({message:'Delete Successfully'});
  }catch(error){
    res.status(500).json({error:'Internal Server Error'});
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedProduct = await BlogModel.findByIdAndUpdate(
      id,
      {title, content },
      { new: true }
    );
    if (updatedProduct) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};