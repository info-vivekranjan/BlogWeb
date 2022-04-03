const express = require("express");
const router = express.Router();
const todosController = require("../controller/todosController");

router.get("/getAllTodos", todosController.getAllTodos);
router.post("/addTodos", todosController.postTodos);
router.put("/updateTodos/:id", todosController.updateTodos);
router.delete("/deleteTodos/:id", todosController.deleteTodos);
module.exports = router;