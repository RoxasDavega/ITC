const { User } = require("../../models");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function handlerGetAllUser(req, res) {
  const users = await User.findAll({
    attributes: ["id", "fullName", "shortName", "photo"],
  });
  return res.status(200).json({
    status: "success",
    message: "Successfully get all users",
    data: users,
  });
}

async function handlerGetUserById(req, res) {
  const { id } = req.params;
  if (id === "search") {
    const { name } = req.query;
    if (name) {
      const users = await User.findAll({
        attributes: ["id", "fullName", "shortName", "photo"],
        where: {
          fullName: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      return res.status(200).json({
        status: "success",
        message: "Successfully get user by name",
        data: users,
      });
    }
  }

  const user = await User.findOne({
    where: {
      id: `${id}`,
    },
  });

  if (user) {
    return res.status(200).json({
      status: "success",
      message: "Successfully get user by id",
      data: user,
    });
  } else {
    return res.status(404).json({
      status: "failed",
      message: "User id not found",
    });
  }
}

async function handlerSearchUser(req, res) {
  const { name } = req.query;
  if (name) {
    const users = await User.findAll({
      attributes: ["id", "fullName", "shortName", "photo"],
      where: {
        fullName: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Successfully get user by name",
      data: users,
    });
  }
}

async function handlerPostUser(req, res) {
  const {
    email,
    password,
    fullName,
    shortName,
    biodata,
    angkatan,
    jabatan,
  } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      email,
      password: hashPassword,
      fullName,
      shortName,
      biodata,
      angkatan,
      jabatan,
    });
    return res.status(200).json({
      status: "success",
      message: "Successfully create user",
      data:  await User.findOne({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        order: [ [ 'createdAt', 'DESC']],
      }),
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Fail to insert.",
    });
  }
}

async function handlerUpdateUser(req, res) {
  const { id } = req.params;
  const { fullName, shortName, biodata, angkatan, jabatan } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  } else {
    try {
      await user.update({
        fullName,
        shortName,
        biodata,
        angkatan,
        jabatan,
      });
      return res.status(200).json({
        status: "success",
        message: "Successfully update user",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Failed to update user",
      });
    }
  }
}

async function handlerDeleteUser(req, res) {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  } else {
    try{
      await user.destroy();
      return res.status(200).json({
        status: "success",
        message: "Successfully delete user",
      });
    }catch(error) {
      return res.status(500).json({
        status: "failed",
        message: "Failed to delete user",
      });
    }
    
  }
}

module.exports = {
  handlerGetAllUser,
  handlerGetUserById, 
  handlerSearchUser,
  handlerPostUser,
  handlerUpdateUser,
  handlerDeleteUser,
};
