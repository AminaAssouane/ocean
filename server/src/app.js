require("dotenv/config");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const followRouter = require("./routes/followRouter");
const likeRouter = require("./routes/likeRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "none", secure: true },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/dashboard", postRouter);
app.use("/users", userRouter);
app.use("/followers", followRouter);
app.use("/likes", likeRouter);
app.use("/comments", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) console.error(`Failed to connect to port ${PORT} : ${error} `);
  else console.log(`Server running on port ${PORT}`);
});
