const path = require('path');
const { readJSON, writeJSON } = require('../model/Database');
const  SchoolSupply = require('../model/SchoolSupply');

const filePath = path.join(__dirname, '../data/SchoolSupply.json');

async function getSchoolSupply(req, res) {
    const data = await readJSON(filePath);
    res.json(data);
}

async function createSchoolSupply(req, res) {
    const { name, price, section, stock, brand, description } = req.body;
    const data = await readJSON(filePath);

    const SchoolSupplyId = Date.now().toString();
    const newSchoolSupply = new SchoolSupply(SchoolSupplyId, name, price, section, stock, brand, description);
    data.push(newSchoolSupply);

    if (!name || !price || !brand ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    await writeJSON(filePath, data);
    res.status(201).json(newSchoolSupply);
}


async function updateSchoolSupply(req, res) {
    const { id } = req.params;
    const { name, price, section, stock, brand, description } = req.body;

    const data = await readJSON(filePath);
    const index = data.findIndex(p => p.SchoolSupplyId === id);
    if (index === -1) return res.status(404).json({ error: 'Util Escolar no encontrado' });

    data[index].name = name;
    data[index].price = price;
    data[index].section = section;
    data[index].stock = stock;
    data[index].brand = brand;
    data[index].description = description

    await writeJSON(filePath, data);
    res.json(data[index]);
}

async function deleteSchoolSupply(req, res) {
    const { id } = req.params;
    const data = await readJSON(filePath);

    const updated = data.filter(p => p.SchoolSupplyId !== id);
    await writeJSON(filePath, updated);

    res.json({ mensaje: 'Util Escolar eliminado' });
}

module.exports = {
    getSchoolSupply,
    createSchoolSupply,
    updateSchoolSupply,
    deleteSchoolSupply
};