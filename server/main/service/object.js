// var model = require('../domain/model.js');

exports.ObjectService = function(dao, customId) {
	this.findAll = function(req, res) {
        // console.log("INFO", "findAll");
        console.log("INFO","Authorization",req.headers.authorization);
        dao.find().exec(function(err,results) {
            if ( err ) {
                res.send(err);    
            } else {
                res.send(results);
            }
        });    
    };
    this.save = function(req, res) {
        // console.log("INFO", "save");
        delete req.body._id;
        var id = dao.fixID(req.params.id, customId);
        dao.findByIdAndUpdate(id,req.body,{upsert:true}).exec(function(err,results) {
            res.send(results);
        });
    };
    this.remove = function(req, res) {
        // console.log("INFO", "remove");
        dao.findByIdAndRemove(req.params.id,function(err,results) {
            res.send(results);
        });
    };
    this.findById = function(req, res) {
        // console.log("INFO", "findById");
        dao.findOne({_id:req.params.id},function(err,results) {
            res.send(results);
        });  
    };
}