const argon2 = require("argon2");

// Middleware pour hacher le mot de passe
const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Validation pour le champ 'password'
    if (password == null) {
      return res.status(400).json({
        error: {
          field: "password",
          message: "Ce champ est obligatoire",
        },
      });
    }
    if (password.length < 4) {
      return res.status(400).json({
        error: {
          field: "password",
          message: "Le mot de passe doit contenir au moins 4 caractères",
        },
      });
    }

    // Hachage du mot de passe avec Argon2
    const hash = await argon2.hash(password);
    req.body.hashed_password = hash;
    delete req.body.password;
    next();
  } catch (err) {
    next(err);
  }
  return null;
};
module.exports = hashPassword;
