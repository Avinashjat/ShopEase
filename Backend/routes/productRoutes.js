import express from 'express';
import { addProduct, getAllProducts } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import { verifyAdmin } from '../middlewares/varifyAdmin.js';
import { authAdmin } from '../middlewares/authAdmin.js';


const router = express.Router();

router.post('/add' ,authAdmin , verifyAdmin, upload.single('image'), addProduct);
router.get('/', getAllProducts);

export default router;
