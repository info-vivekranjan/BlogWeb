const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const todosController = require("../controller/todosController");

router.get("/getAllTodos", auth, todosController.getAllTodos);
router.post("/addTodos", auth, todosController.postTodos);
router.put("/updateTodos/:id", auth, todosController.updateTodos);
router.delete("/deleteTodos/:id", auth, todosController.deleteTodos);
router.post("/register", todosController.registerUser);
router.post("/login", todosController.loginUser);

module.exports = router;
