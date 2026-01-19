const express = require('express');
const {
    getItems,
    addItem,
    deleteItem,
    updateItem,
    getItemById,
} = require('../controllers/item.controller');
const itemRouter = express.Router();

// მომაქვს ყველა item
itemRouter.get('/', getItems);

// ვამატებ items
itemRouter.post('/', addItem);

// ვეძებ id მეშვეობით
itemRouter.get('/:id', getItemById);

// ვშლი
itemRouter.delete('/:id', deleteItem);

// update
itemRouter.put('/:id', updateItem);

module.exports = itemRouter;
