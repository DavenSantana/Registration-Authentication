const express = require("express");
const router = express.Router();

const User = require("../schemas/UserSchema");

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const nameRegex = /^[a-z ,.'-]+$/i;

module.exports = () => {
	router.get("/", redirectIfLoggedIn, (req, res) => {
		return res.render("signup", { success: req.query.success });
	});

	router.post("/", async (req, res, next) => {
		
		let firstName = capitalizeFirstLetter(req.body.firstNameSignup);
		let lastName = capitalizeFirstLetter(req.body.lastNameSignup);
		let emailAddress = req.body.emailAddressSignup.toLowerCase();
		let password = req.body.passwordSignup;
		let confirmPassword = req.body.confirmPasswordSignup;

		// If user bypasses client side validation this will stop
		// them from being able to pass malicious data.
		// It will not give the user error information since if a user
		// is bypassing client side validation this means that they are
		// a malicious user and should not be informed on why they cannot
		// submit the form

		if(firstName == "" || !firstName.match(nameRegex)){
			res.redirect("/signup");
		}

		if(lastName == "" || !lastName.match(nameRegex)){
			res.redirect("/signup");
		}
		
		if(emailAddress == "" || !emailAddress.match(emailRegex)){
			res.redirect("/signup");
		}
		
		if(password == "" || password.length < 8 || password !== confirmPassword){
			res.redirect("/signup");
		}

		if(confirmPassword == "" || confirmPassword.length < 8 || confirmPassword !== password){
			res.redirect("/signup");
		}

		// If everything in the form is valid, passes client side validation
		// and server side validation then check if the email already exists
		// if the email doesn't exist then create the user, otherwise, inform
		// the user that the email already exists

		try {
			
			const checkEmailAddress = await User.findOne({ emailAddress: emailAddress }).exec();

			if (!checkEmailAddress) {
				
				const newUser = new User({
					firstName: firstName,
					lastName: lastName,
					emailAddress: emailAddress,
					password: password,
				});

				const savedUser = await newUser.save();

				if (savedUser) {
					 return res.redirect("/login?success=true");
				}

				return next(new Error("Failed to save user for unknown reasons"));
			
			} else {
				return res.redirect("/signup?success=false");
			}
		} catch (err) {
			return next(err);
		}
	});

	return router;
};

function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function redirectIfLoggedIn(req, res, next) {
	if (req.user) return res.redirect('/');
	return next();
}
