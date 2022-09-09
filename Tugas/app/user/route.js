const express = require("express");
const router = express.Router();
const { handlerGetAllUsers, handlerGetUser, handlerPostUser, handlerUpdateUser, handlerDeleteUser } = require("./handler");

router.get("/", handlerGetAllUsers);

router.get("/:id", handlerGetUser);

// router.get("/search", handlerSearchUser);

router.post("/", handlerPostUser);

router.put("/:id", handlerUpdateUser);

router.delete("/:id", handlerDeleteUser);


module.exports = router;