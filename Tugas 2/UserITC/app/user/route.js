const express = require("express");
const router = express.Router();
const {
  handlerGetAllUsers,
  handlerGetUserById,
  handlerSearchUser,
  handlerPostUser,
  handlerUpdateUser,
  handlerDeleteUser,
} = require("./handler");
const AuthenticationToken = require("../../middleware/AuthenticationToken");

router.get("/", handlerGetAllUsers);

router.get("/search", handlerSearchUser); //search first then using id

router.get("/:id", handlerGetUserById);

router.post("/", handlerPostUser);

router.put("/:id", handlerUpdateUser);

router.delete("/:id", handlerDeleteUser);

module.exports = router;
