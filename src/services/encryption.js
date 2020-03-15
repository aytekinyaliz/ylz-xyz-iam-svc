const fs = require("fs");
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");


const privateKey = fs.readFileSync("./private.pem", "utf8");

function hash(value) {
  return sha1(value);
}

function generateToken({ uid }) {
  const oneHour = 1000 * 60 * 60;
  return jwt.sign({ 
    uid, 
    ext: Date.now() + oneHour
  }, privateKey, { algorithm: "HS256" });
}

async function decodeToken(token) {
  const decodedToken = await jwt.decode(token, { complete: true });

  return decodedToken["payload"];
}

async function verifyToken(token) {
  try {
    await jwt.verify(token, privateKey);
  } catch (err) {
    console.error("Invalid token!!!", err);
    return false;
  }

  return true;
}

module.exports = {
  hash,
  generateToken,
  decodeToken,
  verifyToken
}