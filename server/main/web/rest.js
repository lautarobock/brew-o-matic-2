

/*
Just binding for webapp URL to underlying rest services
*/
exports.bind = function(name, rest, app, path, security) {
    security = security || {};
    path = path || '';
    app.get('/' + path + name+ "/:id", security.findById || [], rest.findById)
    app.get('/' + path + name, rest.findAll);
    app.post('/' + path + name + "/:id", security.save || [], rest.save);
    app.post('/' + path + name, security.save || [], rest.save);    
    app.delete('/' + path + name + "/:id", rest.remove);    
};
