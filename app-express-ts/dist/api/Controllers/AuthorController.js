"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthor = exports.getAuthors = void 0;
const getAuthors = function () {
    return { "authors": "list of authors" };
};
exports.getAuthors = getAuthors;
const getAuthor = function (id) {
    return {
        "author": `author with id: ${id} was fetch, you can change the id in the url, all values accepted`,
    };
};
exports.getAuthor = getAuthor;
