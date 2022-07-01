"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All authors'
    });
});
router.get('/list', (req, res, next) => {
    res.status(200).json({
        message: 'list baseUrl is: ' + req.baseUrl
    });
});
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: `author with id: ${req.params.id} was fetch, you can change the id in the url, all values accepted`,
        id: req.params.id
    });
});
exports.default = router;
