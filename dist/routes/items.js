"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserList_1 = __importDefault(require("../models/UserList"));
const ListItem_1 = __importDefault(require("../models/ListItem"));
const router = express_1.default.Router();
router.post("/lists/:listId/items", async (req, res) => {
    const { title, quantity } = req.body;
    const listId = req.params.listId;
    const newItem = new ListItem_1.default({ title, quantity, isChecked: false, listId });
    try {
        const savedItem = await newItem.save();
        await UserList_1.default.findByIdAndUpdate(listId, { $push: { items: savedItem._id } });
        return res.status(201).json(savedItem);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
});
router.put("/lists/:listId/items/:itemId", async (req, res) => {
    const { itemId } = req.params;
    const { isChecked } = req.body;
    try {
        const updatedItem = await ListItem_1.default.findByIdAndUpdate(itemId, { isChecked }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        return res.json(updatedItem);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
router.get("/lists/:listId/items", async (req, res) => {
    const { listId } = req.params;
    try {
        const items = await ListItem_1.default.find({ listId });
        return res.json(items);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
router.delete("/lists/:listId/items/:itemId", async (req, res) => {
    try {
        const { listId, itemId } = req.params;
        await ListItem_1.default.findByIdAndDelete(itemId);
        await UserList_1.default.findByIdAndUpdate(listId, { $pull: { items: itemId } });
        return res.json({ message: "Item deleted" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.default = router;
