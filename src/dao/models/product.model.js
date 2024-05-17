import mongoose from 'mongoose';

const userCollection = "productos"

const productSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
});

const ProductModel = mongoose.model(userCollection, productSchema);

export default ProductModel;