var User = require('../models/user.model');

module.exports.index = async function( req, res) {
	var users = await User.find();
	res.render('users/index', {
		users: users
	});
};

module.exports.search = function(req, res) {
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user) {
		return user.name.indexOf(q) !== -1;
	});

	res.render('users/index', {
		users: matchedUsers
	});
};

module.exports.create = function(req, res) {
	res.render('users/create');
};

module.exports.get =async function(req, res) {
	var id = req.params.id;

	var user = await User.findById(id);

	res.render('users/view', {
		user: user
	});
};

module.exports.postCreate = async function(req, res) {
	var user = {
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		name: req.body.name,
		avatar: req.file.path.split('\\').slice(1).join('/')
	}
	
	await User.create(user);
	res.redirect('/users');
};