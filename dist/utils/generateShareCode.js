"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShareCode = generateShareCode;
function generateShareCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
