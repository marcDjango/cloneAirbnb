// Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");
// Defining the chargingStationManager class that extends AbstractManager
class ReviewsManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "charging_station"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "Reviews" });
  }

  async getCommentsForListing(listingId) {
    try {
      const query = `
        SELECT Reviews.id, Reviews.rating, Reviews.comment, Users.name AS author_name, Users.firstname AS author_firstname
        FROM ${this.table}
        INNER JOIN Users ON Reviews.author_id = Users.id
        WHERE Reviews.listing_id = ?;
      `;

      const [results] = await this.database.query(query, [listingId]);

      return results;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commentaires pour l'annonce:",
        error
      );
      throw error;
    }
  }
}

module.exports = ReviewsManager;
