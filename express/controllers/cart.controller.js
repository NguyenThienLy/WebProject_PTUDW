module.exports.addToCart = function(req, res, next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if (!sessionId) {
		res.redirect('/products');
		return;
	}

	var count = db.get('sessions')
	.find({ id: sessionId })
	.get('cart.' + productId, 0)
	.value();

	db.get('sessions')
	  .find({ id: sessionId })
	  .set('cartcả.' + productId, count + 1)
	  .write();

	var cart = db.get('sessions')
	.find({ id: sessionId })
	.value();

	var sum = Object.values(cart.cart).reduce(function(accumulator, cart) {
		return accumulator + cart;
	});

	res.render('products/index', {
		products: db.get('products').value().slice(1, 9),
		count: sum
	});
};