const argon2 = require("argon2");

const jwt = require("jsonwebtoken");

// Middleware pour vérifier le mot de passe lors de l'authentification
const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  const { hashed_password: hashedPassword } = req.user;

  try {
    const reponse = await argon2.verify(hashedPassword, password);
    if (!reponse) {
      res.sendStatus(401);
    }
    const payload = {
      sub: req.user,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60,
    });

    delete req.user.hashed_password;
    res.status(200).send({ token, user: req.user });
  } catch (err) {
    next(err);
  }
};
module.exports = verifyPassword;
