const { Client } = require("pg");
const config = require("config");

const client =
  new Client({
    user: "postgres",
    password: config.get("postgresPassword"),
    host: "localhost",
    port: 5432,
    database: "fin_tracker"
  }) || process.env.DATABASE_URL;
client.connect();

module.exports = client;
