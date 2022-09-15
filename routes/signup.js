const express = require("express");

const router = express.Router();

const User = require("../schemas/UserSchema");

module.exports = () => {
	router.get("/", (req, res) => {
		return res.render("signup");
	});

	router.post("/", async (req, res, next) => {
		
        let firstName = req.body.firstNameSignup;
		let lastName = req.body.lastNameSignup;
		let emailAddress = req.body.emailAddressSignup;
		let password = req.body.passwordSignup;
		
        try {
			
            const newUser = new User({
				firstName: firstName,
				lastName: lastName,
				emailAddress: emailAddress,
				password: password,
			});
			
            const savedUser = await newUser.save();

			if (savedUser) return res.redirect("/");
			return next(new Error("Failed to save user for unknown reasons"));
		} catch (err) {
			return next(err);
		}
	});

	return router;
};
