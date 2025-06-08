import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['ecommerce', 'grocery'], required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  imagePublicId: { type: String, required: true }, // for deleting later if needed
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
