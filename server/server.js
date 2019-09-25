const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
//Initialize Body Parser
app.use(express.json({ extended: false }));
app.use("/api/users/item", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
