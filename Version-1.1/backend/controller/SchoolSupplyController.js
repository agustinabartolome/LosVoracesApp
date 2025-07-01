/*const path = require('path');
const { readJSON, writeJSON } = require('../model/Database');
const SchoolSupply = require('../model/SchoolSupply');

const filePath = path.join(__dirname, '../data/SchoolSupply.json');

async function getSchoolSupply(req, res) {
    try {
        const data = await readJSON(filePath);
        res.json(data);
    } catch (error) {
        console.error('getSchoolSupply error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

async function createSchoolSupply(req, res) {
    try {
        const { name, price, section, stock, brand, description } = req.body;

        if (!name || price == null || !brand) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }


        const data = await readJSON(filePath);

        const SchoolSupplyId = Date.now().toString();
        const newSchoolSupply = new SchoolSupply(SchoolSupplyId, name, price, section, stock, brand, description);
        data.push(newSchoolSupply);


        await writeJSON(filePath, data);
        res.status(201).json(newSchoolSupply);

    } catch (error) {
        console.error('createSchoolSupply error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
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

    res.json({ message: 'Util Escolar eliminado' });
}

async function renderCatalog(req, res) {
    try {
        const schoolSupplies = await readJSON(filePath);
        res.render('SchoolSupplyCatalog', { schoolSupplies });
    } catch (err) {
        console.error('Error al renderizar el catalogo de útiles escolares', err);
        res.status(500).send('Error al cargar el catálogo de útiles escolares');
    }
}

module.exports = {
    getSchoolSupply,
    createSchoolSupply,
    updateSchoolSupply,
    deleteSchoolSupply,
    renderCatalog,
};*/

const SchoolSupply = require("../model/SchoolSupply.js");
const { updateStock } = require("../model/helpers/stockHelper");

async function getSchoolSupplies(req, res) {
  try {
    const schoolSupplies = await SchoolSupply.find();
    res.json(schoolSupplies);
  } catch (error) {
    console.error("getSchoolSupplies error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function createSchoolSupply(req, res) {
  try {
    const { name, price, section, stock, brand, description } = req.body;

    if (!name || price == null || !brand) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const schoolSupplyId = Date.now().toString();
    const newSchoolSupply = new SchoolSupply({
      schoolSupplyId,
      name,
      price,
      section,
      stock,
      brand,
      description,
    });

    await newSchoolSupply.save();
    res.status(201).json(newSchoolSupply);
  } catch (error) {
    console.error("createSchoolSupply error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function updateSchoolSupply(req, res) {
  const { id } = req.params;
  const { name, price, section, stock, brand, description } = req.body;

  try {
    const schoolSupply = await SchoolSupply.findOne({ schoolSupplyId: id });

    if (!schoolSupply)
      return res.status(404).json({ error: "Útil escolar no encontrado" });

    schoolSupply.name = name;
    schoolSupply.price = price;
    schoolSupply.section = section;
    schoolSupply.stock = stock;
    schoolSupply.brand = brand;
    schoolSupply.description = description;

    await schoolSupply.save();
    res.json(schoolSupply);
  } catch (error) {
    console.error("updateSchoolsupply error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function deleteSchoolSupply(req, res) {
  const { id } = req.params;

  try {
    const schoolSupply = await SchoolSupply.findOne({ schoolSupplyId: id });

    if (!schoolSupply) {
      return res.status(404).json({ error: "Útil escolar no encontrado" });
    }

    await schoolSupply.deleteOne();

    res.json({ message: "Útil escolar eliminado" });
  } catch (error) {
    console.error("deleteSchoolSupply error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function renderCatalog(req, res) {
  try {
    const schoolSupplies = await SchoolSupply.find();
    res.render("SchoolSupplyCatalog", { schoolSupplies });
  } catch (err) {
    console.error("Error al renderizar el catalogo de útiles escolares", err);
    res.status(500).send("Error al cargar el catálogo de útiles escolares");
  }
}

async function updateSchoolSupplyStock(req, res) {
  const { id } = req.params;
  const { quantity } = req.body; 

  if (typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Quantity debe ser un número' });
  }

  try {
    const schoolSupply = await SchoolSupply.findOne({ schoolSupplyId: id });
    if (!schoolSupply) return res.status(404).json({ error: "Util Escolar no encontrado" });

    schoolSupply.stock = updateStock(schoolSupply.stock, quantity);

    await schoolSupply.save();
    res.json({ message: 'Stock actualizado', schoolSupply });
  } catch (error) {
    console.error("updateSchoolSupplyStock error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  getSchoolSupplies,
  createSchoolSupply,
  updateSchoolSupply,
  deleteSchoolSupply,
  renderCatalog,
  updateSchoolSupplyStock
};
