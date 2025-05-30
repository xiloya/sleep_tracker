const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const auth = require("./routes/auth.routes");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", auth);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
