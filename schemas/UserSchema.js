const mongoose = require("mongoose");
require("mongoose-type-email");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	emailAddress: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
	password: { type: String, required: true },
});

userSchema.pre("save", async function preSave(next) {
	const user = this;

	if (!user.isModified("password")) return next();

	try {
		const hash = await bcrypt.hash(user.password, saltRounds);
		user.password = hash;
		return next();
	} catch (error) {
		return next(error);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
