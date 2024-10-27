"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserList_1 = __importDefault(require("../models/UserList"));
const generateShareCode_1 = require("../utils/generateShareCode");
const router = express_1.default.Router();
router.post("/lists", async (req, res) => {
    const { name, creatorEmail } = req.body;
    const shareCode = (0, generateShareCode_1.generateShareCode)();
    const newList = new UserList_1.default({ name, creatorEmail, shareCode, items: [] });
    try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.get("/lists/:shareCode", async (req, res) => {
    try {
        const list = await UserList_1.default.findOne({ shareCode: req.params.shareCode }).populate("items");
        if (!list)
            return res.status(404).json({ message: "List not found" });
        res.json(list);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.default = router;
