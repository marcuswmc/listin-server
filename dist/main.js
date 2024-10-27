"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const lists_1 = __importDefault(require("./routes/lists"));
const items_1 = __importDefault(require("./routes/items"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use("/api", lists_1.default);
app.use("/api", items_1.default);
const startApp = async () => {
    try {
        mongoose_1.default.set("strictQuery", true);
        await mongoose_1.default.connect(process.env.MONGO_URI || " ");
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Error");
    }
};
startApp();
