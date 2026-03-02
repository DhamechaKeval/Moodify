require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/config/database.config.js");

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on PORT 3000");
});
