const { User } = require("../../models");
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function handlerGetUser(req, res) {
  const { fullname } = req.query;
  if (fullname) {
    const users = await User.findAll({
      where: {
        fullname: {
          [Op.like]: `%${fullname}%`,
        },
    }});
    return res.status(200).json(users);
  }
  const users = await User.findAll();
  return res.status(200).json(users);
};

async function handlerPostUser(req, res) {
  const {
    email,
    password,
    fullname,
    shortname,
    photo,
    biodata,
    angkatan,
    jabatan,
  } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashPassword,
    fullname,
    shortname,
    photo,
    biodata,
    angkatan,
    jabatan,
  });
  return res.status(200).json(user);
};

async function handlerUpdateUser(req, res) {
  const { id } = req.params;
  const { shortname, photo, biodata } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    await user.update({
      shortname,
      photo,
      biodata,
    });
    return res.status(200).json(user);
  }
};

async function handlerDeleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    } else {
        await user.destroy();
        return res.status(200).json({
            message: "Delete Success",
        })
    }
};

module.exports = {
    handlerGetUser,
    handlerPostUser,
    handlerUpdateUser,
    handlerDeleteUser,
};
