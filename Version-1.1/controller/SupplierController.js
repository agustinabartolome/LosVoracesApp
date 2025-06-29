/*const path = require('path');
const { readJSON, writeJSON } = require('../model/Database');
const Supplier = require('../model/Supplier');

const filePath = path.join(__dirname, '../data/Supplier.json');

async function getSuppliers(req, res) {
  try {
    const data = await readJSON(filePath);
    res.json(data);
  } catch (error) {
    console.error('getSuppliers error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

}

async function createSupplier(req, res) {
  try {

    const { name, phoneNumber, email, category, catalog } = req.body;


    if (!name || !phoneNumber || !email || !category || !catalog) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const data = await readJSON(filePath);

    const supplierId = Date.now().toString();
    const newSupplier = new Supplier(supplierId, name, phoneNumber, email, category, catalog);
    data.push(newSupplier);


    await writeJSON(filePath, data);
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error('createSupplier error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function updateSupplier(req, res) {
  const { id } = req.params;
  const { name, phoneNumber, email, category, catalog } = req.body;

  const data = await readJSON(filePath);
  const index = data.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Proveedor no encontrado' });

  data[index].name = name;
  data[index].phoneNumber = phoneNumber;
  data[index].email = email;
  data[index].category = category;
  data[index].catalog = catalog;

  await writeJSON(filePath, data);
  res.json(data[index]);
}

async function deleteSupplier(req, res) {
  const { id } = req.params;
  const data = await readJSON(filePath);

  const updated = data.filter(s => s.supplierId !== id);
  await writeJSON(filePath, updated);

  res.json({ messaje: 'Proveedor eliminado' });
}

async function getSuppliersByCategory(req, res) {
  const { category } = req.params;
  const data = await readJSON(filePath);

  const filtered = data.filter(s => s.category.toLowerCase() === category.toLowerCase());
  res.json(filtered);
}

async function getSupplierById(req, res) {
  const { id } = req.params;
  const data = await readJSON(filePath);

  const supplier = data.find(s => s.supplierId === id);
  if (!supplier) {
    return res.status(404).json({ error: 'Proveedor no encontrado' });
  }

  res.json(supplier);
}

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliersByCategory,
  getSupplierById
};*/

const Supplier = require ("../model/Supplier");

async function getSuppliers(req, res) {
  try {
    const suppliers = await Supplier.find();
    res.render('Suppliers', { suppliers })
  } catch (error) {
    console.error('getSuppliers error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

}

async function createSupplier(req, res) {
  try {

    const { name, phoneNumber, email, category, catalog } = req.body;


    if (!name || !phoneNumber || !email || !category || !catalog) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const supplierId = Date.now().toString();
    const newSupplier = new Supplier(supplierId, name, phoneNumber, email, category, catalog);
    

    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error('createSupplier error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function updateSupplier(req, res) {
  const { id } = req.params;
  const { name, phoneNumber, email, category, catalog } = req.body;
try {
  const supplier = await Supplier.findOne({ supplierId: id });
  
  if (!supplier) return res.status(404).json({ error: 'Proveedor no encontrado' });

  supplier.name = name;
  supplier.phoneNumber = phoneNumber;
  supplier.email = email;
  supplier.category = category;
  supplier.catalog = catalog;

  await supplier.save();
  res.json(supplier);
} catch (error) {
    console.error("updateSupplier error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }  
}

async function deleteSupplier(req, res) {
  const { id } = req.params;
  try {
  const supplier = await Supplier.findOne ({ supplierId: id });

  if (!supplier) {
    return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  await supplier.deleteOne();
res.json({ messaje: 'Proveedor eliminado' });
} catch (error) {
    console.error("deleteSupplier error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function getSuppliersByCategory(req, res) {
  const { category } = req.params;

  try {
    const filtered = await Supplier.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
    res.json(filtered);
  } catch (error) {
    console.error('getSuppliersByCategory error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function getSupplierById(req, res) {
  const { id } = req.params;

  try {
    const supplier = await Supplier.findOne({ supplierId: id });

    if (!supplier) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    res.json(supplier);
  } catch (error) {
    console.error('getSupplierById error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliersByCategory,
  getSupplierById
};