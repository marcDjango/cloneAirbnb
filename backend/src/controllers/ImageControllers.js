const tables = require("../tables");
const { cloudinary } = require("../cloudinary");

const browse = async (req, res, next) => {
  try {
    const messages = await tables.Images.readAll();

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const message = await tables.Images.read(req.params.id);
    if (!message) {
      res.sendStatus(404);
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    next(error);
  }
};
const getAllImagesForListing = async (req, res, next) => {
  try {
    const { listingId } = req.params; // Supposons que l'ID de l'annonce est dans les paramètres de l'URL
    const comments = await tables.Images.getImagesForListing(listingId);

    res.json(comments); // Envoyer les commentaires en tant que réponse JSON
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commentaires pour l'annonce:",
      error
    );
    next(error); // Passez l'erreur au gestionnaire d'erreurs express
  }
};
// ------------------ Méthode POST for CLOUDINARY ------------------
const uploadCloud = async (req, res) => {
  // Post sur Cloudinary
  try {
    const { objectToPost } = req.body;
    const uploadResponse = await cloudinary.uploader.upload(
      objectToPost.image,
      {
        upload_presets: "rkg1lybb",
      }
    );
    delete objectToPost.image;
    const updatedObject = { ...objectToPost, url: uploadResponse.secure_url };

    // console.info("updatedObject", updatedObject);
    // console.info("uploadResponse", uploadResponse);

    // Post en database
    const response = await tables.Images.add(updatedObject);
    // console.log(response);
    // console.info(response);
    res.json({ response, msg: "YAYAYAYAA" });
  } catch (error) {
    console.error(error);
  }
};

// ------------------ Méthode GET URL for CLOUDINARY ------------------
const getImagesFromCloud = async (req, res) => {
  try {
    const { ressource } = await cloudinary.search
      .expression("folder:dev_setups")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();
    const publicIds = ressource.map((file) => file.public_id);
    res.send(publicIds);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const edit = async (req, res, next) => {
  try {
    const message = await tables.Images.edit(req.body, req.params.id);
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
    const message = await tables.Images.add(req.body);
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
    const result = await tables.Images.delete(req.params.id);
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
  getAllImagesForListing,
  getImagesFromCloud,
  uploadCloud,
  edit,
  add,
  destroy,
};
