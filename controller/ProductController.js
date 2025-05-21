const path = require('path');
const { readJSON, writeJSON } = require('../model/Database');
const Product = require('../model/Product');

const filePath = path.join(__dirname, '../data/Product.json');

async function getProducts(req, res) {
    const data = await readJSON(filePath);
    res.json(data);
}

async function createProduct(req, res) {
    const { name, category } = req.body;
    const data = await readJSON(filePath);

    const productId = Date.now().toString();
    const newProduct = new Product(productId, name, category);
    data.push(newProduct);

    await writeJSON(filePath, data);
    res.status(201).json(newProduct);
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, category } = req.body;

    const data = await readJSON(filePath);
    const index = data.findIndex(p => p.productId === id);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

    data[index].name = name;
    data[index].category = category;

    await writeJSON(filePath, data);
    res.json(data[index]);
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    const data = await readJSON(filePath);

    const updated = data.filter(p => p.productId !== id);
    await writeJSON(filePath, updated);

    res.json({ mensaje: 'Producto eliminado' });
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
