const express = require('express'),
      hbs = require('hbs'),
      assets = require('./config/assets.json'),
      compression = require('compression'),
      logger = require('morgan');

hbs.registerHelper('assets', function (asset) {
  return assets[asset];
});

var app = express();

app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.static('public', {
  maxAge: '365d'
}));

app.use(compression());

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3001, () => {
  console.log('Web server is running on port 3001');
});
