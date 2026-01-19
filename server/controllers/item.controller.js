const Items = require("../models/item.model");

// მომაქვს ყველა item
const getItems = async (req, res) => {
    const items = await Items.find();

    if (!items) {
        return res.status(404).json({ error: 'Items not found' });
    }

    return res.status(200).json(items);
};

// ვეძებ item id მეშვეობით
const getItemById = async (req, res) => {
    const id = req.params.id;
    const item = await Items.findById(id);

    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    return res.status(200).json(item);
};

// ვამატებ items
const addItem = async (req, res) => {
    const body = req.body;
    const newItem = await Items.create(body);
    res.status(201).json(newItem);
};


// ვშლი
const deleteItem = async (req, res) => {
    const id = req.params.id;

    const item = await Items.findByIdAndDelete(id);

    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    return res.status(200).json("item deleted");
};

// update
const updateItem = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const newItem = await Items.findByIdAndUpdate(id, body, { new: true });

    if (!newItem) {
        return res.status(404).json({ error: 'Item not found' });
    }

    return res.status(200).json(newItem);
};

module.exports = {
    getItems,
    addItem,
    deleteItem,
    updateItem,
    getItemById
};
