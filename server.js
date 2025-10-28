const express = require("express");
const path = require("path");
const app = express();
const routes = require("./server/routes/weather");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
