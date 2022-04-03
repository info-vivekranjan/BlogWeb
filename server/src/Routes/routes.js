const auth = require('../middleware/auth')
const express = require("express");
const router = express.Router();
const blogsController = require("../controller/blogsController");

router.get(
  "/getAllBlogs",
  auth,
  blogsController.allowIfLoggedin,
  blogsController.grantAccess("readOwn", "profile"),
  blogsController.getAllBlogs
);
router.post(
  "/addBlogs",
  auth,
  blogsController.allowIfLoggedin,
  blogsController.grantAccess("createAny", "profile"),
  blogsController.postBlogs
);
router.put(
  "/updateBlogs/:id",
  auth,
  blogsController.allowIfLoggedin,
  blogsController.grantAccess("updateAny", "profile"),
  blogsController.updateBlogs
);
router.delete(
  "/deleteBlogs/:id",
  auth,
  blogsController.allowIfLoggedin,
  blogsController.grantAccess("deleteAny", "profile"),
  blogsController.deleteBlogs
);
router.post("/register", blogsController.registerUser);
router.post("/login", blogsController.loginUser);

module.exports = router;
