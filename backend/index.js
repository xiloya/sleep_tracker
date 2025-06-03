const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const auth = require("./routes/auth.routes");
const sleepDataRoutes = require("./routes/sleepData");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", auth);
app.use("/api/sleepdata", sleepDataRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
