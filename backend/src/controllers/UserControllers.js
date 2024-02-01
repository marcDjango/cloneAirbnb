const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const messages = await tables.Users.readAll();

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const message = await tables.Users.read(req.params.id);
    if (!message) {
      res.sendStatus(404);
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    next(error);
  }
};
const readByEmailAndPassToNext = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await tables.Users.readByEmail(email);
    const errors = [];
    if (user == null) {
      errors.push({
        field: "Email ou le mot de passe",
        message: "sont incorrect",
      });
      res.status(401).json({ validationErrors: errors });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};
const edit = async (req, res, next) => {
  try {
    const message = await tables.Users.edit(req.body, req.params.id);
    if (message == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const message = await tables.Users.add(req.body);
    if (!message) {
      res.sendStatus(404);
    } else {
      res.status(201).json(message);
    }
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.Users.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  readByEmailAndPassToNext,
  edit,
  add,
  destroy,
};
