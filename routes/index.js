const express = require("express");
const passport = require("passport");

const signupPageRoute = require("./signup");
const loginPageRoute = require("./login");
const userDashboardPageRoute = require("./userDashboard");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("index", { userLoggedIn: req.user });
	});

	router.get("/logout", function (req, res, next) {
		req.logout(function (err) {
			if (err) {
				return next(err);
			}
			res.redirect("/");
		});
	});

	router.use("/signup", signupPageRoute());
	router.use("/login", loginPageRoute());
	router.use("/dashboard", userDashboardPageRoute());

	return router;
};
