"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        get: obfuscate,
        required: true,
        select: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    description: {
        type: String,
        select: true,
    },
    link: {
        type: String,
        required: false,
    }
});
function obfuscate(value) {
    if (!value)
        return '';
    const separatorIndex = value.indexOf('@');
    if (separatorIndex < 3) {
        return value.slice(0, separatorIndex).replace(/./g, '*') + value.slice(separatorIndex);
    }
    return value.slice(0, 2) + value.slice(2, separatorIndex).replace(/./g, '*') + value.slice(separatorIndex);
}
exports.default = (0, mongoose_1.model)('User', userSchema);
