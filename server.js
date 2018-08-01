var express = require('express'),
  app = express(),
  port = process.env.PORT || 8090,
  bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'))
//Routes Handling
// var routes = require('./api/routes/bitCoinRoute'); //importing route
// routes(app); //register the route

console.log("logg")
//  var routes = require('./api/routes/liteCoinRoute'); //importing route
//  routes(app); //register the route

// var routes = require('./api/routes/vergeCurrencyRoute'); //importing route
// routes(app); //register the route

var routes = require('./api/routes/aidosCoinRoutes') //importing Routes
routes(app);

// var routes=require('./api/routes/ethCoinRoutes') //importing Routes
// routes(app);

// var routes=require('./api/routes/nanoRoutes')
// routes(app)

var routes=require('./api/routes/aidos_bitRoutes')
routes(app)
//  var diamond=require('./api/routes/bitCoinDiamondRoutes')
// app.use('/diamond',diamond)
//  var routes=require('./api/routes/wallet-routes')
//  routes(app)
 
 const adk=require('./api/routes/wallet-routes')
 app.use('/adk',adk)

app.use(function (req, res) {
  res.status(404).send({
    resource: req.originalUrl + ' not found'
  })
});
app.listen(port);
console.log('RESTful API server started on: ' + port);