// var logentries = require('node-logentries');
// var log = logentries.logger({
//   token:'a5e5473f-568f-4058-9f52-4fb5f1153f22'
// });

var dist = process.argv.indexOf('dist') != -1;
console.log("DIST",process.argv);
var publicDirName = '../../app';
if ( dist ) publicDirName = '../../dist';

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon("app/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
console.log("PUBLIC",publicDirName);
app.use(express.static(path.join(__dirname, publicDirName)));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// var rootRedirect = function(req, res) {
//     res.redirect("html/");
// };
// app.get("/", rootRedirect);
// app.get("/index.html", rootRedirect);

//Connect to Mongoose
require("mongoose").connect(process.env.MONGOLAB_URI);

require("./config").configure(app);

// log.info("TEST");
var server = http.createServer(app).listen(app.get('port'), function(){
    // log.info('Express server listening on port ' + app.get('port'));
  console.log('Express server listening on port ' + app.get('port'));
});