const bcrypt = require("bcrypt");

const { User } = require("../../models");
const { generateAccessToken } = require("../../utils/tokenManager");
const {
  validateUserLoginPayload,
  validateUserRegisterPayload,
} = require("../../validator/user");


async function handlerLoginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    validateUserLoginPayload(req.body);
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    
    const passwordValidate = bcrypt.compareSync(password, user.password);
    if (!passwordValidate) {
      throw new Error("Invalid password");
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      shortName: user.shortName,
      jabatan: user.jabatan,
    });

    res.status(200).json({
      status: "success",
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
}

async function handlerRegisterUser(req, res, next) {
  try {
    const { email, password, fullName, shortName, biodata, angkatan, jabatan } =
      req.body;
    validateUserRegisterPayload(req.body);
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashPassword,
      fullName,
      shortName,
      biodata,
      angkatan,
      jabatan,
    });

    res.status(200).json({
      status: "success",
      message: "Successfully create user",
      data: await User.findOne({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        order: [["createdAt", "DESC"]], //to sent last data inserted to database
      }),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handlerLoginUser,
  handlerRegisterUser,
};
