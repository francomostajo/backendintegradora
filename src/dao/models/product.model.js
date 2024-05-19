import mongoose from 'mongoose';

const productsCollection = "productos"

const productSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
});

const ProductModel = mongoose.model(productsCollection, productSchema);

export default ProductModel;