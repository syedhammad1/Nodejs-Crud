const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
// let RedisStore = require("connect-redis")(session);
const {
  MONGO_IP,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const app = express();

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
  )
  .then(() => console.log("Connected to DB Successfully!"))
  .catch((err) => {
    console.log(err);
  });
app.enable("trust proxy");
app.use(cors({}));
app.use(express.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  })
);
app.get("/api/v1", (req, res) => {
  console.log("yeah it ran!");
  res.send("<h2>Hi !</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port", port));
