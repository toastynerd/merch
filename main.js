var pl = require('pluralize');
var bodyParser = require('body-parser');

module.exports.restify = function(app, Model, baseRoute) {
    baseRoute = baseRoute || '';
    var modelName = pl.plural(Model.name);
    app.use(bodyParser.json());

    app.get('/' + baseRoute + modelName, function(req, res, next){
	Model.find({}, function(err, models){
	    res.setHeader('Content-Type', 'application/json');
	    if(err) {
		res.send(500, err);
		return false;
	    }
	    res.send(models);
	});
    });

    app.get('/' + baseRoute + modelName + '/:id', function(req, res, next){
	Model.findOne({'_id': req.params.id}, function(err, resModel){
	    res.setHeader('Content-Type', 'application/json');
	    if(err) {
		res.send(500, err);
		return false;
	    }
	    res.send(resModel);
	});
    });

    app.post('/' + baseRoute + modelName, function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	var model = new Model(req.body);
	model.save(function(req, resModel){
	    if(err) {
		res.send(500, err);
		return false;
	    }
	    res.send(resModel);
	});
    });

    app.put('/' + baseRoute + modelName + '/:id', function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	Model.update({'_id': req.params.id}, req.body, function(err){
	    if(err) {
		res.send(500, err);
		return false;
	    }
	    res.send(req.body);
	});
    });

    app.delete('/' + baseRoute + modelName + '/:id', function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	Model.destroy({'_id': req.params.id}, function(err){
	    if(err) {
		res.send(500, err);
		return false;
	    }
	    res.send({'msg': 'success'});
	});
    });
}
