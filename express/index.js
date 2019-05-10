require('dotenv').config();

var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var customerIndexRoute = require('./routes/customer.index.route');
var customerProductRoute = require('./routes/customer.product.route');
var customerInfoRoute = require('./routes/customer.info.route');
var customerCartRoute = require('./routes/customer.cart.route');

var adminIndexRoute = require('./routes/admin.index.route');
var adminProductRoute = require('./routes/admin.product.route');
var adminInfoRoute = require('./routes/admin.info.route');
var adminCustomerRoute = require('./routes/admin.index.route');
var adminOrderRoute = require('./routes/admin.order.route');
var adminCommentRoute = require('./routes/admin.comment.route');

//  var authRoute = require('./routes/auth.route');
//  var cartRoute = require('./routes/cart.route')

// var apiProductRoute = require('./api/routes/product.route');
// var apiUserRoute = require('./api/routes/user.route')

// var authMiddleware = require('./middlewares/auth.middleware');
// var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(cookieParser(process.env.SESSION_SECRET));
//app.use(sessionMiddleware);

app.engine('hbs', exphbs({
    layoutsDir: 'views/_layouts'
}));
app.set('view engine', 'hbs');

app.use('/customer/index', customerIndexRoute);
app.use('/customer/product', customerProductRoute);
app.use('/customer/info', customerInfoRoute);
app.use('/customer/cart', customerCartRoute);

app.use('/admin/index', adminIndexRoute);
app.use('/admin/product', adminProductRoute);
app.use('/admin/info', adminInfoRoute);
app.use('/admin/customer', adminCustomerRoute);
app.use('/admin/order', adminOrderRoute);
app.use('/admin/comment', adminCommentRoute);

// app.get('/',function( req, res) {
// 	res.render('login');
// });

// app.get('/404NotFound',function( req, res) {
// 	res.render('404NotFound');
// });

// app.use('/users', authMiddleware.requireAuth, userRoute);
// app.use('/products', productRoute);
// app.use('/auth', authRoute);
// app.use('/cart', cartRoute);
// app.use('/api/products',apiProductRoute);
// app.use('/api/users',apiUserRoute);

app.listen(port, function(){
	console.log('Server listening on port'+ port);
});