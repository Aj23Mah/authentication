const express = require("express");
const userController = require("./user.controller");
const authenticateToken = require("../config/jwt.interceptor");
const userRoutes = express.Router();

userRoutes.get("", userController.getUser);
userRoutes.get("/:id", authenticateToken, userController.getUserById);
userRoutes.post("", userController.postUser);
userRoutes.put("/:id", userController.putUser);
userRoutes.delete("/:id", userController.deleteUser);

userRoutes.get("/", userController.getUser);


userRoutes.post("/login", userController.loginForm);
userRoutes.post("/signup", userController.signupForm);


module.exports = userRoutes;
