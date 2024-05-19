import express from 'express';
import ProductModel from '../dao/models/product.model.js';
import { socketServer } from '../app.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find().lean();
        res.render('home', { products });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await ProductModel.findById(pid).lean();
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

router.post('/', async (req, res) => {
    const { title, category, description, price, thumbnail, code, stock } = req.body;
    try {
        const product = new ProductModel({ title, category, description, price, thumbnail, code, stock });
        await product.save();
        socketServer.emit('productAdded', product.toObject()); // Convierte el documento a objeto plano
        res.status(200).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'No se pudo agregar el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    try {
        await ProductModel.findByIdAndUpdate(pid, updatedFields);
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        await ProductModel.findByIdAndDelete(pid);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
});

export default router;