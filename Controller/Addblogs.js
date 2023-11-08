import BlogModel from '../Model/Addblog.js';
import multer from 'multer';
import multerS3 from 'multer-storage-s3';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const s3BucketName = 'cyclic-wild-cummerbund-newt-ca-central-1'; // Replace with your S3 bucket name

// const uploadS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: s3BucketName,
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(null, 'blogs/' + Date.now() + '-' + file.originalname);
//     }
//   })
// });

export const createBlog = async (req, res) => {
  const { title, content, publishDate, author } = req.body;

  try {
    // Get image URLs from request files
    // const imageUrl = req.files['image'][0].location;
    // const authorImageUrl = req.files['authorImage'][0].location;

    let image = req.path.slice(1)

  console.log(typeof req.body)

  const imageObject = await s3.putObject({
    Body: JSON.stringify(req.body),
    Bucket: process.env.BUCKET,
    Key: image,
  }).promise()

  res.set('Content-type', 'text/plain')
  res.send('ok').end()

    // Create new blog post
    const newBlog = new BlogModel({
      title,
      author,
      content,
      publishDateTime: new Date(publishDate),
      authorImage: {
        url: authorImageUrl
      },
      image: {
        imageObject
      }
    });

    // Save the blog post to the database
    const savedBlog = await newBlog.save();
    console.log(savedBlog);

    // Send success response
    res.json({ Response: true, message: 'Added Successfully ' });
    console.log('Blog added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ Response: false, message: 'Internal Server Error' });
  }
});




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