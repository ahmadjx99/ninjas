var Ninjago = require('../models/ninjago'),
  mapper = require('../lib/model-mapper');

module.exports = function(app) {

  app.param('ninjagoId', function(req, res, next, id) {
    Ninjago.findById(id, function(err, ninjago) {
      if (err) {
        next(err);
      } else {
        res.locals.ninjago = ninjago;
        next();
      }
    });
  });
  
  app.get('/ninjagos', function(req, res) {
    Ninjago.find({}, function(err, ninjagos) {
      res.render('ninjago/index', { ninjagos : ninjagos });
    });
  });

  app.get('/ninjagos/create', function(req, res) {
    res.render('ninjago/create', { ninjago : new Ninjago() });
  });

  app.post('/ninjagos/create', function(req, res) { 
    var ninjago = new Ninjago(req.body);

    ninjago.save(function(err) {
      if (err) {
        res.render('ninjago/create', {
          ninjago : ninjago
        });
      } else {
        res.redirect('/ninjagos');
      }
    });
  });

  app.get('/ninjagos/:ninjagoId/edit', function(req, res) {
    res.render('ninjago/edit');
  });

  app.post('/ninjagos/:ninjagoId/edit', function(req, res) {
    mapper.map(req.body).to(res.locals.ninjago);

    res.locals.ninjago.save(function(err) {
      if (err) {
        res.render('ninjago/edit');
      } else {
        res.redirect('/ninjagos');
      }
    });
  });

  app.get('/ninjagos/:ninjagoId/detail', function(req, res) {
    res.render('ninjago/detail');
  });

  app.get('/ninjagos/:ninjagoId/delete', function(req, res) {
    res.render('ninjago/delete');
  });

  app.post('/ninjagos/:ninjagoId/delete', function(req, res) {
    Ninjago.remove({ _id : req.params.ninjagoId }, function(err) {
      res.redirect('/ninjagos');
    });
  });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
  name : 'Ninjago',
  route : '/ninjagos'
}
