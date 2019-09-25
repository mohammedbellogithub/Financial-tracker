const client = require("./client");

const queryData = async (test, value) => {
  try {
    const result = await client.query(test, value);
    console.log(result.rows);

    return result.rows;
  } catch (error) {
    console.log("Unable to query " + error);
  }
};

module.exports = queryData;
