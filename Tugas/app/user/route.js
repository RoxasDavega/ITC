const express = require("express");
const router = express.Router();
const { handlerGetAllUsers, handlerGetUserById, handlerSearchUser, handlerPostUser, handlerUpdateUser, handlerDeleteUser } = require("./handler");

router.get("/", handlerGetAllUsers);

router.get("/search", handlerSearchUser); //search first then using id

router.get("/:id", handlerGetUserById);

router.post("/", handlerPostUser);

router.put("/:id", handlerUpdateUser);

router.delete("/:id", handlerDeleteUser);


module.exports = router;