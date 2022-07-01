"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../../config"));
const router = express_1.default.Router();
router.get('/', function (req, res) {
    res.status(200).json({
        linkLabel: 'See express api here',
        endpoint: config_1.default.endpoint,
        otherRessources: {
            authors: config_1.default.endpoint + '/authors',
            authorsList: config_1.default.endpoint + '/authors/list',
            authorsId: config_1.default.endpoint + '/authors/14'
        }
    });
});
exports.default = router;
