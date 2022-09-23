const express = require("express");
const { handlerLoginUser, handlerRegisterUser } = require("./handler");
const router = express.Router();

router.post("/login", handlerLoginUser);
router.post("/register", handlerRegisterUser);

module.exports = router;