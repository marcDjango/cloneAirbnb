// Importer le client de la base de données
const pool = require("../../database/client");

// Importer la fonction isArray depuis le module des services utils
// const { isArray } = require("../services/utils");

// Fournir l'accès à la base de données via la classe AbstractManager
class AbstractManager {
  constructor({ table }) {
    // Stocker le nom de la table
    this.table = table;
    // Fournir l'accès au client de la base de données
    this.pool = pool;
  }

  // Méthode pour lire un enregistrement par son ID
  async read(id) {
    try {
      // Exécuter une requête pour sélectionner un enregistrement avec l'ID donné
      const { rows } = await this.pool.query(
        `SELECT * FROM ${this.table} WHERE id = $1`,
        [id]
      );
      // Retourner la première ligne (en supposant qu'il n'y a qu'un seul résultat)
      return rows[0];
    } catch (error) {
      console.error("Error reading record:", error.message);
      throw error;
    }
  }

  // Méthode pour lire tous les enregistrements
  async readAll() {
    try {
      // Exécuter une requête pour sélectionner tous les enregistrements de la table
      const { rows } = await this.pool.query(`SELECT * FROM ${this.table}`);
      // Retourner tous les enregistrements
      return rows;
    } catch (error) {
      console.error("Error reading all records:", error.message);
      throw error;
    }
  }

  // Méthode pour éditer/mettre à jour un enregistrement par son ID
  async edit(body, id) {
    try {
      // Obtenir les valeurs du corps de la requête
      const values = Object.values(body);
      // Obtenir les clés du corps de la requête
      const keys = Object.keys(body);
      // Construire la partie SET de la requête SQL
      const setClause = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      // Exécuter une requête pour mettre à jour l'enregistrement avec l'ID donné
      const { rowCount } = await this.pool.query(
        `UPDATE ${this.table} SET ${setClause} WHERE id = $${keys.length + 1}`,
        [...values, id]
      );
      // Retourner le nombre de lignes affectées
      return rowCount;
    } catch (error) {
      console.error("Error editing record:", error.message);
      throw error;
    }
  }

  // Méthode pour ajouter/inserer un nouvel enregistrement
  async add(body) {
    try {
      // Obtenir les valeurs du corps de la requête
      const values = Object.values(body);
      // Obtenir les clés du corps de la requête
      const keys = Object.keys(body);
      // Construire la partie VALUES de la requête SQL
      const placeholders = keys.map((key, index) => `$${index + 1}`).join(", ");
      // Exécuter une requête pour insérer un nouvel enregistrement dans la table
      const { rows } = await this.pool.query(
        `INSERT INTO ${this.table} (${keys.join(
          ", "
        )}) VALUES (${placeholders}) RETURNING id`,
        values
      );
      // Retourner l'ID de l'enregistrement inséré
      return rows[0].id;
    } catch (error) {
      console.error("Error adding record:", error.message);
      throw error;
    }
  }

  // Méthode pour supprimer un enregistrement par son ID
  async delete(id) {
    try {
      // Exécuter une requête pour supprimer l'enregistrement avec l'ID donné
      const { rowCount } = await this.pool.query(
        `DELETE FROM ${this.table} WHERE id = $1`,
        [id]
      );
      // Retourner le nombre de lignes affectées
      return rowCount;
    } catch (error) {
      console.error("Error deleting record:", error.message);
      throw error;
    }
  }
}

// Prêt à exporter
module.exports = AbstractManager;
