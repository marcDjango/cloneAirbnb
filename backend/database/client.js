// Importer les variables d'environnement pour la connexion à la base de données
require("dotenv").config();
const { Pool } = require("pg");

// Créer un pool de connexion à la base de données
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Essayer de se connecter à la base de données
pool
  .connect()
  .then(() => {
    console.info(`Using database ${process.env.DB_NAME}`);
  })
  .catch((error) => {
    console.warn(
      "Warning:",
      "Failed to establish a database connection.",
      "Please check your database credentials in the .env file if you need a database access."
    );
    console.error("Error message:", error.message);
  });

// Exporter le pool de connexion pour une utilisation ultérieure
module.exports = pool;
