const express = require("express");
const mongoose = require("mongoose");
const dot = require("dotenv");
// const authRoute = require("./routes/auth");
const noteRoute = require("./routes/notes");
const cors = require("cors");
const PORT = 3000;
const app = express();

app.use(express.json());
// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

dot.config().parsed;

//mongoDB Atlas URL in ENV File
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB failed to connect", err);
  });

app.get("/health", (req, res) => {
  console.log("i am in health api");
  res.json({
    service: "Backend Job Listing API Server",
    status: "active",
    time: new Date(),
  });
});

// app.use("/api/v1/auth", authRoute);
app.use("/api/v1/notes", noteRoute);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ errorMessage: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Backend server is listing at: ${PORT}`);
});
