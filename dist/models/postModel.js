"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    area: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Post', postSchema);
