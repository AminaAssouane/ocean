require("dotenv/config");
const cors = require("cors");
const express = require("express");
const authRouter = require("./src/routes/authRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error(`Failed to connect to port ${PORT} : ${error} `);
  else console.log(`Server running on port ${PORT}`);
});
