const express = require("express");

const signupPageRoute = require("./signup");
const loginPageRoute = require("./login");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("index");
	});

	router.use("/signup", signupPageRoute());
	router.use("/login", loginPageRoute());

	return router;
};
