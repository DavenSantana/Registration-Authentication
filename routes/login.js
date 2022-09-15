const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		return res.render("login");
	});

	router.post("/", (req, res) => { 
        
		let email = req.body.emailAddressLogin;
        let password = req.body.passwordLogin;

		res.redirect("/");

    });
    
	return router;
};
