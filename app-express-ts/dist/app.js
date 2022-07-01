"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const HomeRouter_1 = __importDefault(require("./api/Routes/HomeRouter"));
const AuthorRouter_1 = __importDefault(require("./api/Routes/AuthorRouter"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    const idAuthor = parseInt(req.path.split('/')[2]);
    console.log(idAuthor);
    req.idAuthor = idAuthor;
    if (isNaN(idAuthor)) {
        req.idAuthor = 1;
    }
    next();
});
if (config_1.default.env !== "prod") {
    app.use((0, cors_1.default)());
}
app.use('/', HomeRouter_1.default);
app.use('/authors', AuthorRouter_1.default);
exports.default = app;
