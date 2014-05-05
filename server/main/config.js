var model = require("./domain/model");
var ObjectService = require("./service/object").ObjectService;
var rest = require("./web/rest");

exports.configure = function(app) {
	var services = [{
	    name: "Recipe",
	    customId: true
	}];

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

	for( var i=0; i<services.length; i++ ) {
		var service = new ObjectService(model[services[i].name],services[i].customId);
		rest.bind(services[i].name, service, app, 'api/', security);	
	}

	
	
	// app.get("/api/test/byuser/", function(req,res) {
	// 	res.send("BY_USER");
	// });
	

};