const jwt = require("jsonwebtoken");

const accessTokenSecretKey = "testing-secret-key";

function generateAccessToken(userPayload) {
  return jwt.sign(userPayload, accessTokenSecretKey, {
    subject: userPayload.shortName,
    expiresIn: "15m",
  });
}

module.exports = { generateAccessToken };
