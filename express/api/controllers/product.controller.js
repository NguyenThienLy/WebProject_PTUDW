var Product = require('../../models/product.model');

module.exports.index = async function( req, res) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 9;

	var start = (page - 1) * perPage;
	var end = page * perPage;

	var products = await Product.find();
	res.json(products);
	
};

module.exports.search = function(req, res) {
	var q = req.query.q;
	var matchedProducts = db.get('products').value().filter(function(product) {
		return product.name.indexOf(q) !== -1;
	});

	res.render('products/index', {
		products: matchedProducts
	});
};

module.exports.create = function(req, res) {
	res.render('products/create');
};

/*module.exports.get = function(req, res) {
	var id = req.params.id;

	var user = db.get('product').find({ id: id
	}).value();

	res.render('users/view', {
		user: user
	});
};*/

module.exports.postCreate =  function(req, res) {
	var product = {
		name: req.body.name,
		image: 'https://loremflickr.com/320/240',
		decription: req.body.decription
	}
	
	db.Product.insertOne(product);	
};