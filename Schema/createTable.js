const client = require("../config/client");

const sql = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
  user_id UUID NOT NULL PRIMARY KEY,
  full_name VARCHAR(170) NOT NULL,
  email VARCHAR(170) NOT NULL,
  pass_word VARCHAR(200) NOT NULL,
  date_created DATE NOT NULL, 
  UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS items(
    item_id UUID PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    price REAL NOT NULL,
    description VARCHAR(10000) NOT NULL,
    date_created TIMESTAMP NOT NULL,
    user_id UUID REFERENCES users(user_id)
);`;

client.query(sql, (err, res) => {
  if (err) {
    console.log(err);

    console.log("Was not successful!!");
  } else {
    console.log("DataBase Created");
  }

  client.end();
});
