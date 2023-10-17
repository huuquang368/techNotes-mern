const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOption");

const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);
// process, recieve and parse JSON in application
app.use(express.json());

// middleware 3rd party
app.use(cors(corsOptions));
app.use(cookieParser());

// tell server to grab static file from public folder
// app.use("/", express.static(path.join(__dirname, "public"))); // also the same
app.use(express.static("public"));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
