// routes/menu.js
const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

// Serializer pour le menu
const menuSerializer = (menuItem) => ({
  id: menuItem.id,
  name: menuItem.name,
  price: menuItem.price,
  description: menuItem.description,
});

// Obtenir tous les éléments du menu
router.get("/", async (req, res) => {
  const items = await MenuItem.findAll();
  res.json(items.map(menuSerializer));
});

// Ajouter un élément au menu (Admin)
router.post("/", async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newItem = await MenuItem.create({ name, price, description });
    res.status(201).json(menuSerializer(newItem));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
