// Importing the AbstractManager class
const AbstractManager = require("./AbstractManager");
// Defining the chargingStationManager class that extends AbstractManager
class UserManager extends AbstractManager {
  // Constructor initializes the class and sets the table name to "charging_station"
  constructor() {
    // Calling the constructor of the parent class (AbstractManager) with the table name
    super({ table: "Users" });
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );
    return rows[0];
  }
}

// Exporting the ChargingStationManager class
module.exports = UserManager;
