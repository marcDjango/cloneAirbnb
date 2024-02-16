// Importation de la classe AbstractManager
const AbstractManager = require("./AbstractManager");

// Définition de la classe ReviewsManager qui étend AbstractManager
class ReviewsManager extends AbstractManager {
  // Constructeur initialise la classe et définit le nom de la table sur "Reviews"
  constructor() {
    // Appel du constructeur de la classe parent (AbstractManager) avec le nom de la table
    super({ table: "Reviews" }); // Utilisation du nom de table en minuscules
  }

  // Méthode pour récupérer les commentaires pour une annonce spécifique (listing)
  async getCommentsForListing(listingId) {
    try {
      const query = `
        SELECT Reviews.id, Reviews.rating, Reviews.comment, Users.name AS author_name, Users.firstname AS author_firstname
        FROM ${this.table}
        INNER JOIN Users ON Reviews.author_id = Users.id
        WHERE Reviews.listing_id = $1;
      `;

      const { rows } = await this.pool.query(query, [listingId]);

      return rows;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commentaires pour l'annonce :",
        error
      );
      throw error;
    }
  }
}

// Exportation de la classe ReviewsManager
module.exports = ReviewsManager;
