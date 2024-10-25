"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ListItem_1 = __importDefault(require("../models/ListItem"));
const router = express_1.default.Router();
router.get("/items", async (req, res) => {
    try {
        const items = await ListItem_1.default.find();
        res.json(items);
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
});
router.post("/items", async (req, res) => {
    const { title, quantity } = req.body;
    const newItem = new ListItem_1.default({
        title,
        quantity,
    });
    try {
        const savedItem = await newItem.save();
        console.log("Item salvo no banco:", savedItem);
        res.status(201).json(savedItem);
    }
    catch (err) {
        const error = err;
        res.status(400).json({ message: error.message });
    }
});
router.put("/items/:id", async (req, res) => {
    try {
        const updatedItem = await ListItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    }
    catch (err) {
        const error = err;
        res.status(400).json({ message: error.message });
    }
});
router.delete("/items/:id", async (req, res) => {
    try {
        await ListItem_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    }
    catch (err) {
        const error = err;
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
