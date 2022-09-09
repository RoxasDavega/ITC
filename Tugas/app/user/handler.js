const { User } = require("../../models");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//To Show All Users
async function handlerGetAllUsers(req, res) {
  const users = await User.findAll({
    attributes: ["id", "fullName", "shortName", "photo"], //Show Users with specific column
  });
  return res.status(200).json({
    status: "success",
    message: "Successfully get all users",
    data: users,
  });
}
//To Show user by id or search
async function handlerGetUser(req, res) {
  const { id } = req.params;
  if (id === "search") { //if user want to search
    const { name } = req.query;
    if (name) { //if name is found
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
    } //if query name is not found
    return res.status(404).json({
      status: "failed",
      message: "Attributes not found",
    });
  }
  //search one user by id
  const user = await User.findOne({
    where: {
      id: `${id}`,
    },
  });

  if (user) { //user is found
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
//Input User
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
  //hash password with bcrypt
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
        order: [ [ 'createdAt', 'DESC']], //to sent last data inserted to database
      }),
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Fail to insert.",
    });
  }
}
//Update User
async function handlerUpdateUser(req, res) {
  const { id } = req.params;
  const { fullName, shortName, biodata, angkatan, jabatan } = req.body; //get value from user
  const user = await User.findByPk(id); //search user by id
  if (!user) { //if user not found
    res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  } else {
    try {
      await user.update({ //update to database
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
//Delete user
async function handlerDeleteUser(req, res) {
  const { id } = req.params;
  const user = await User.findByPk(id); //to search user by primary key id
  if (!user) { //if user not found
    return res.status(404).json({
      status: "failed",
      message: "User not found",
    });
  } else {
    try{
      await user.destroy(); //delete user
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
  handlerGetAllUsers,
  handlerGetUser, 
  handlerPostUser,
  handlerUpdateUser,
  handlerDeleteUser,
};
