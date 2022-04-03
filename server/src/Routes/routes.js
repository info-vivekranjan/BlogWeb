const auth = require('../middleware/auth')
const express = require("express");
const router = express.Router();
const todosController = require("../controller/todosController");

router.get(
  "/getAllTodos",
  auth,
  todosController.allowIfLoggedin,
  todosController.grantAccess("readOwn", "profile"),
  todosController.getAllTodos
);
router.post(
  "/addTodos",
  auth,
  todosController.allowIfLoggedin,
  todosController.grantAccess("createAny", "profile"),
  todosController.postTodos
);
router.put(
  "/updateTodos/:id",
  auth,
  todosController.allowIfLoggedin,
  todosController.grantAccess("updateAny", "profile"),
  todosController.updateTodos
);
router.delete(
  "/deleteTodos/:id",
  auth,
  todosController.allowIfLoggedin,
  todosController.grantAccess("deleteAny", "profile"),
  todosController.deleteTodos
);
router.post("/register", todosController.registerUser);
router.post("/login", todosController.loginUser);

module.exports = router;
