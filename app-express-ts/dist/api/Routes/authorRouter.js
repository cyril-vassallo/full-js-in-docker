"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthorController_1 = require("../Controllers/AuthorController");
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.status(200).json((0, AuthorController_1.getAuthors)());
});
router.get('/:id', (req, res, next) => {
    res.status(200).json((0, AuthorController_1.getAuthor)(parseInt(req.params.id)));
});
exports.default = router;
