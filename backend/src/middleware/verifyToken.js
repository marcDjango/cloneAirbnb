// const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    throw new Error("Merci de vous identifier !");
  }

  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    throw new Error("Authorization header has not the 'Bearer' type");
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si la date d'expiration est valide
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return res.status(401).json({ error: "Token has expired" });
    }

    req.user = token;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
  return null;
};

module.exports = verifyToken;
