
var rest = require("./web/rest");

exports.configure = function(app) {
	var security = {
		// findById: function(req, res, next) {
		// 	console.log("SECURITY-FIND_BY_ID");
		// 	if ( req.params.id == "COCO") {
		// 		next();	
		// 	} else {
		// 		res.send(401,{error:'Operacion no autorizada'});
		// 	}
            
  //       }
	};
	var service = {
		findAll: function(req, res) {
            res.send("ok-findAll");
        },
        save: function(req, res) {
            res.send("ok-save");
        },
        remove: function(req, res) {
            res.send("ok-remove");
        },
        findById: function(req, res) {
            res.send("ok-findById:"+req.params.id);
        }
	}
	app.get("/api/test/byuser/", function(req,res) {
		res.send("BY_USER");
	});
	rest.bind('test', service, app, 'api/', security);

};