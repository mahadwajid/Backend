import express from 'express';
import multer from 'multer';
import { createBlog, deleteblog, getBlogs, updateProduct,} from '../Controller/Addblogs.js';
import { auth } from '../middlewares/Authentication.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
      },
    filename:function (req ,file, cb){
        cb(null , Date.now() + '-' + file.originalname);
    },
});

const upload= multer({
    storage : storage,
    limits: {
        fieldSize: 1024 * 1024 * 100,
    },
});

// router.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: './images/'
// }));

// Routes for blogs
router.post('/',  upload.fields([{ name: 'image' }, { name: 'authorImage' }]), createBlog);
// router.post('/', createBlog);
router.get('/', getBlogs);

router.delete("/:id",deleteblog);

router.put("/:id",updateProduct);

export default router;