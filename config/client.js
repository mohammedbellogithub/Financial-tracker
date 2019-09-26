const { Client } = require("pg");
const config = require("config");

const client = new Client({
  connectionString:
    "postgres://lzutnqznxmvjkf:f1707d7e58292492c5454264079c0b97a147ca55d64619f759fff8e6854d27cc@ec2-54-197-238-238.compute-1.amazonaws.com:5432/d79jd29pu5p5tv"
});
client.connect();

module.exports = client;
