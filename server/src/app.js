require("dotenv/config");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const authRouter = require("./routes/authRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", secure: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error(`Failed to connect to port ${PORT} : ${error} `);
  else console.log(`Server running on port ${PORT}`);
});
