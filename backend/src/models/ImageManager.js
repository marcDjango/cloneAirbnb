// Importation de la classe AbstractManager
const AbstractManager = require("./AbstractManager");

// Définition de la classe ImageManager qui étend AbstractManager
class ImageManager extends AbstractManager {
  // Constructeur initialise la classe et définit le nom de la table sur "Images"
  constructor() {
    // Appel du constructeur de la classe parent (AbstractManager) avec le nom de la table
    super({ table: "Images" }); // Utilisation du nom de table en minuscules
  }

  // Méthode pour récupérer les images pour une annonce spécifique (listing)
  async getImagesForListing(listingId) {
    try {
      const query = `
        SELECT id, url
        FROM Images
        WHERE listing_id = $1;`;

      const values = [listingId];
      const { rows } = await this.pool.query(query, values);

      return rows;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des images pour l'annonce :",
        error
      );
      throw error;
    }
  }
}

// Exportation de la classe ImageManager
module.exports = ImageManager;
