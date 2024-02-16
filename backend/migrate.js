// Load environment variables from .env file
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

// Build the path to the schema SQL file
const schema = path.join(__dirname, "database", "schema.sql");

// Get database connection details from .env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Update the database schema
const migrate = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = fs.readFileSync(schema, "utf8");

    // Create a pool of connections to the database
    const pool = new Pool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    // Execute the SQL statements to update the database schema
    await pool.query(sql);

    // Release the pool
    await pool.end();

    console.info(`${DB_NAME} updated from ${schema} 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

// Run the migration function
migrate();
