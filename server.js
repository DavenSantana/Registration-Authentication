const database = require ('./database/database');
const routes = require("./routes");
const bodyParser = require ('body-parser');
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser")
require("dotenv").config();

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes());

app.listen(port, () => {
	console.log(`Express listening on port:${port}`);
});
