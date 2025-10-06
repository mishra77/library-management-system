const UserModel = require("./user-model");
const BookModel = require("./book-model");
const bookModel = require("./book-model");

module.exports = {UserModel, BookModel};

//This file servers as a index for the models, allowing for easier imports in other parts of the application
//It exports the UserModel and BookModel , which can be used in routed or controllers to interact with the database