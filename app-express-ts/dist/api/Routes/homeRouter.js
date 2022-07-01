"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../Controllers/homeController");
const router = express_1.default.Router();
router.get('/', function (req, res) {
    res.status(200).json((0, homeController_1.home)());
});
exports.default = router;
