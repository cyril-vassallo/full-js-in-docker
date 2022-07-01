"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const config_1 = __importDefault(require("../../config"));
const home = function (id) {
    return {
        title: "homepage",
        authors: config_1.default.endpoint + "/authors",
        author: config_1.default.endpoint + "/authors/" + id
    };
};
exports.home = home;
