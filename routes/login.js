const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		return res.render("login");
	});

	router.post("/login", (req, res) => { 

        // Handle login form here
        // All logic will be done in database file that handles login, just use functions
        // directly from that file

    });
    
	return router;
};
