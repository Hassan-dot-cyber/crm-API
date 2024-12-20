const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const leadStatusRoutes = require("./routes/leadStatusRoutes");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/api", leadStatusRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
