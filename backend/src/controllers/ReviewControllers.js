const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const messages = await tables.Reviews.readAll();

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const message = await tables.Reviews.read(req.params.id);
    if (!message) {
      res.sendStatus(404);
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    next(error);
  }
};

const getCommentsForListingController = async (req, res, next) => {
  try {
    const { listingId } = req.params; // Supposons que l'ID de l'annonce est dans les paramètres de l'URL
    const comments = await tables.Reviews.getCommentsForListing(listingId);

    res.json({ comments }); // Envoyer les commentaires en tant que réponse JSON
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commentaires pour l'annonce:",
      error
    );
    next(error); // Passez l'erreur au gestionnaire d'erreurs express
  }
};

const edit = async (req, res, next) => {
  try {
    const message = await tables.Reviews.edit(req.body, req.params.id);
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
    const message = await tables.Reviews.add(req.body);
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
    const result = await tables.Reviews.delete(req.params.id);
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
  getCommentsForListingController,
  edit,
  add,
  destroy,
};
