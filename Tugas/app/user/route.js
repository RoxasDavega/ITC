const express = require("express");
const router = express.Router();
const { handlerGetUser, handlerPostUser, handlerUpdateUser, handlerDeleteUser } = require("./handler");

router.get("/", handlerGetUser);

router.post("/", handlerPostUser);

router.put("/:id", handlerUpdateUser);

router.delete("/:id", handlerDeleteUser);

module.exports = router;