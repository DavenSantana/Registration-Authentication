const routes = require("./routes");
require("dotenv").config();

const path = require("path");
const express = require("express");

const app = express();

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes());

app.listen(port, () => {
	console.log(`Express listening on port:${port}`);
});
