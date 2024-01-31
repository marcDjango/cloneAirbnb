const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const messages = await tables.Favorites.readAll();

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const message = await tables.Favorites.read(req.params.id);
    if (!message) {
      res.sendStatus(404);
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const message = await tables.Favorites.edit(req.body, req.params.id);
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
    const message = await tables.Favorites.add(req.body);
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
    const result = await tables.Favorites.delete(req.params.id);
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
  edit,
  add,
  destroy,
};
