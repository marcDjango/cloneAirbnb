// Importation de la classe AbstractManager
const AbstractManager = require("./AbstractManager");

// Définition de la classe AmenitieManager qui étend AbstractManager
class AmenitieManager extends AbstractManager {
  // Constructeur initialise la classe et définit le nom de la table sur "Amenities"
  constructor() {
    // Appel du constructeur de la classe parent (AbstractManager) avec le nom de la table
    super({ table: "Amenities" }); // Utilisation du nom de table en minuscules
  }

  // Méthode pour récupérer les équipements pour une annonce spécifique (listing)
  async getAmenitiesForListing(listingId) {
    try {
      const query = `
            SELECT amenities.name
            FROM ${this.table}
            INNER JOIN listingamenities ON amenities.id = listingamenities.amenity_id
            WHERE listingamenities.listing_id = $1;
        `;

      const values = [listingId];

      const { rows } = await this.pool.query(query, values);

      return rows.map((row) => row.name);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des équipements pour l'annonce :",
        error
      );
      throw error;
    }
  }
}

// Exportation de la classe AmenitieManager
module.exports = AmenitieManager;
