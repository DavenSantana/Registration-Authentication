const express = require("express");
const passport = require("passport");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfNotLoggedIn, (req, res) => {
        let userInfo = createUserInfo(req.user);
		return res.render("userDashboard", {userInfo: userInfo, success: req.query.success});
	});
  
	return router;
};

function redirectIfNotLoggedIn(req, res, next) {
	if (!req.user) return res.redirect('/');
	return next();
}

function createUserInfo(user) {
    
    let firstName = user.firstName;
    let lastName = user.lastName;
    let emailAddress = user.emailAddress;
    let password = user.password;

    let div = 
    `<div class="container py-5">
        <div class="d-flex justify-content-center">
            <div class="col-8">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Hello, ${firstName} ${lastName}</h5>
                                <p class="card-text">The email you used to login is ${emailAddress}</p>
                                <p class="card-text">The password you used to login is ${password} although this is the hashed and secured version</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    return div;
}