
var ObjectService = require("../../main/service/object").ObjectService;

describe("service/object.js", function() {

	var res;
	var dao;
	var findExec;

	beforeEach(function(done) {
		res = {
			send: function() {}
		};
		dao = {
			find: function() {},
			findByIdAndUpdate: function() {},
			fixID: function() {},
			findByIdAndRemove: function() {},
			findOne: function() {}
		};
		findExec = {
			exec: function() {}
		};

		done();
	});
	

	it("Should create generic ObjectService and call findAll successfully", function(done) {

		spyOn(res,'send');
		spyOn(dao,'find').andReturn(findExec);
		spyOn(findExec,'exec').andCallFake(function(callback) {
			callback(null, [{name: 'Lautaro'}]);
		});

		var service = new ObjectService(dao,false);

		service.findAll({},res);

		expect(dao.find).toHaveBeenCalled();
		expect(findExec.exec).toHaveBeenCalled();
		expect(res.send).toHaveBeenCalledWith([{name: 'Lautaro'}]);

		done();

	});

	it("Should create generic ObjectService and call findAll with error", function(done) {

		spyOn(res,'send');
		spyOn(dao,'find').andReturn(findExec);
		spyOn(findExec,'exec').andCallFake(function(callback) {
			callback({message: 'error'});
		});

		var service = new ObjectService(dao,false);

		service.findAll({},res);

		expect(dao.find).toHaveBeenCalled();
		expect(findExec.exec).toHaveBeenCalled();
		expect(res.send).toHaveBeenCalledWith({message: 'error'});

		done();

	});

	it("Should create generic ObjectService (customID=false) and call save successfully to insert", function(done) {

		spyOn(res,'send');
		spyOn(dao,'findByIdAndUpdate').andReturn(findExec);
		spyOn(dao,'fixID').andReturn('generated_id')
		spyOn(findExec,'exec').andCallFake(function(callback) {
			callback(null, {name: 'new object',_id:'generated_id'});
		});

		var service = new ObjectService(dao,false);

		//not customID and insert => no _id will be sent
		var req = {
			body: {
				name: 'new object'
			},
			params: {}
		};

		service.save(req,res);

		expect(dao.findByIdAndUpdate).toHaveBeenCalledWith('generated_id',req.body,{upsert:true});
		expect(dao.fixID).toHaveBeenCalledWith(undefined,false);
		expect(findExec.exec).toHaveBeenCalled();
		expect(res.send).toHaveBeenCalledWith({name: 'new object',_id:'generated_id'});

		done();

	});

	it("Should create generic ObjectService (customID=false) and call save successfully to update", function(done) {

		spyOn(res,'send');
		spyOn(dao,'findByIdAndUpdate').andReturn(findExec);
		spyOn(dao,'fixID').andReturn('object_id')
		spyOn(findExec,'exec').andCallFake(function(callback) {
			callback(null, {name: 'new object',_id:'object_id'});
		});

		var service = new ObjectService(dao,false);

		//not customID and update => _id will be sent (both, body and params)
		var req = {
			body: {
				name: 'new object',
				_id: 'object_id'
			},
			params: {
				id: 'object_id'
			}
		};

		service.save(req,res);

		expect(dao.findByIdAndUpdate).toHaveBeenCalledWith('object_id',req.body,{upsert:true});
		expect(dao.fixID).toHaveBeenCalledWith('object_id',false);
		expect(findExec.exec).toHaveBeenCalled();
		expect(res.send).toHaveBeenCalledWith({name: 'new object',_id:'object_id'});

		done();

	});

	it("Should create generic ObjectService (customID=true) and call save successfully to insert", function(done) {

		spyOn(res,'send');
		spyOn(dao,'findByIdAndUpdate').andReturn(findExec);
		spyOn(dao,'fixID').andReturn('custom_id')
		spyOn(findExec,'exec').andCallFake(function(callback) {
			callback(null, {name: 'new object',_id:'custom_id'});
		});

		var service = new ObjectService(dao,true);

		//customID and insert => _id will be sent
		var req = {
			body: {
				name: 'new object',
				_id: 'custom_id'
			},
			params: {}
		};

		service.save(req,res);

		expect(dao.findByIdAndUpdate).toHaveBeenCalledWith('custom_id',req.body,{upsert:true});
		expect(dao.fixID).toHaveBeenCalledWith(undefined,true);
		expect(findExec.exec).toHaveBeenCalled();
		expect(res.send).toHaveBeenCalledWith({name: 'new object',_id:'custom_id'});

		done();

	});

	it("Should create generic ObjectService (customID=true) and call save successfully to update", function(done) {

		spyOn(res,'send');
		spyOn(dao,'findByIdAndUpdate').andReturn(findExec);
		spyOn(dao,'fixID').andReturn('object_id')
		spyOn(findExec,'exec').andCallFake(function(callback) {
			callback(null, {name: 'new object',_id:'object_id'});
		});

		var service = new ObjectService(dao,true);

		//not customID and update => _id will be sent (both, body and params)
		var req = {
			body: {
				name: 'new object',
				_id: 'object_id'
			},
			params: {
				id: 'object_id'
			}
		};

		service.save(req,res);

		expect(dao.findByIdAndUpdate).toHaveBeenCalledWith('object_id',req.body,{upsert:true});
		expect(dao.fixID).toHaveBeenCalledWith('object_id',true);
		expect(findExec.exec).toHaveBeenCalled();
		expect(res.send).toHaveBeenCalledWith({name: 'new object',_id:'object_id'});

		done();

	});
	
	it("Should create generic ObjectService and call remove successfully", function(done) {

		spyOn(res,'send');
		spyOn(dao,'findByIdAndRemove').andCallFake(function(id, callback) {
			callback(null, [{_id:'object_id', name: 'Lautaro'}]);
		});

		var service = new ObjectService(dao,false);

		var req = {
			params: {
				id: 'object_id'
			}
		};

		service.remove(req,res);

		expect(dao.findByIdAndRemove).toHaveBeenCalled();
		expect(res.send).toHaveBeenCalledWith([{_id:'object_id', name: 'Lautaro'}]);

		done();

	});
	
	it("Should create generic ObjectService and call findById successfully", function(done) {

		spyOn(res,'send');
		spyOn(dao,'findOne').andCallFake(function(filter, callback) {
			callback(null, [{_id:'object_id', name: 'Lautaro'}]);
		});

		var service = new ObjectService(dao,false);

		var req = {
			params: {
				id: 'object_id'
			}
		};

		service.findById(req,res);

		expect(dao.findOne).toHaveBeenCalledWith({_id:'object_id'},jasmine.any(Function));
		expect(res.send).toHaveBeenCalledWith([{_id:'object_id', name: 'Lautaro'}]);

		done();

	});

});