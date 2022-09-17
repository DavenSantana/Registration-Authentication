const express = require("express");
const passport = require("passport");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfLoggedIn, (req, res) => {
		return res.render("login", { success: req.query.success });
	});

	router.post("/", passport.authenticate("local", { successRedirect: "/dashboard?success=true", failureRedirect: "/login?success=false" }));
  
	return router;
};

function redirectIfLoggedIn(req, res, next) {
	if (req.user) return res.redirect('/');
	return next();
}
