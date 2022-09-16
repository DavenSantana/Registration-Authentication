const express = require("express");

const router = express.Router();

const User = require("../schemas/UserSchema");

module.exports = () => {
	router.get("/", (req, res) => {
		return res.render("signup");
	});

	router.post("/", async (req, res, next) => {
		
        let firstName = capitalizeFirstLetter(req.body.firstNameSignup);
		let lastName = capitalizeFirstLetter(req.body.lastNameSignup);
		let emailAddress = req.body.emailAddressSignup.toLowerCase();
		let password = req.body.passwordSignup;

		// Server side authentication only needs to check if email address exists

		if(firstName == ""){
			res.redirect("/");
		}
		
        try {
			
            const newUser = new User({
				firstName: firstName,
				lastName: lastName,
				emailAddress: emailAddress,
				password: password,
			});
			
			// Do a database find function, if the email address already exists then redirect to login
			// If it doesn't exist and it's another error then redirect to failed to save user for unknown reasons
			

            const savedUser = await newUser.save();

			if (savedUser) {return res.redirect("/"); } else {
				return res.redirect("/login");
			}
			return next(new Error("Failed to save user for unknown reasons"));
		} catch (err) {
			return next(err);
		}
	});

	return router;
};

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}