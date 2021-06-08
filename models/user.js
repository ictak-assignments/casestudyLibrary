const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLoalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
	email: {
		type:String,
		required:true,
		unique: true
	}
});

UserSchema.plugin(passportLoalMongoose);

module.exports = mongoose.model('User', UserSchema);
