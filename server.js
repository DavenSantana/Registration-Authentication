const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const database = require("./lib/database");
const routes = require("./routes");
const auth = require("./lib/auth");
require("dotenv").config();

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));

const port = 3000;

app.use(express.static(path.join(__dirname, "./")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: false, store: MongoStore.create({ mongoUrl: process.env.DATABASE_LOGIN }) }));

app.use(auth.initialize);
app.use(auth.session);
app.use(auth.setUser);

app.use(routes());

app.use(function(req, res, next) {
	res.status(404);
	return res.render('404', { userLoggedIn: req.user });
});
  

app.listen(port, () => {
	console.log(`Express listening on port:${port}`);
});
