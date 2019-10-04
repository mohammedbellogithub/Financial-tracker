const { Client } = require("pg");
const config = require("config");

const db = {
  user: "postgres",
  password: config.get("postgresPassword"),
  host: "localhost",
  port: 5432,
  database: "fin_tracker"
} || {
  connectionString: process.env.DATABASE_URL
};
const client = new Client(db);
const connectClient = async () => {
  await client.connect();
};

connectClient();

module.exports = client;
