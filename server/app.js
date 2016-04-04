var http = require('http');
var loki = require('lokijs');
var db = new loki('config.json');
var configs = db.addCollection('configs');


console.log('server running at http://localhost:8080');



http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  console.log('checking request method');

  //LIST configs
  if (request.method === 'GET' && request.url === '/config') {

    console.log('URI /config get list');
    
    request.on('error', function(err) {
      console.error(err);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
    

      var data = JSON.parse(body);

      console.log('body:'+body);
      
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');


      response.on('error', function(err) {
        console.error(err);
      });
      
      response.write(JSON.stringify(payload));
      response.end();
      
    });
  //GET a config
  } else if(request.method === 'GET' && request.url == '/config/*'){
    
    console.log('URI /config'); 
    
    request.on('error', function(err) {
      console.error(err);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
    

      var data = JSON.parse(body);
      
      var payload = {};
      
      
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');


      response.on('error', function(err) {
        console.error(err);
      });
      
      response.write(JSON.stringify(payload));
      response.end();
      
    });
  //CREATE a config
  } else if(request.method === 'POST' && request.url === '/config') {
    request.on('error', function(err) {
      console.error(err);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();

      var data = JSON.parse(body);
      var savedObject = configs.insert(data);
      var payload = savedObject;
      
      
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');


      response.on('error', function(err) {
        console.error(err);
      });
      
      response.write(JSON.stringify(payload));
      response.end();
    });
  // UPDATE
  } else if(request.method === 'PUT' && request.url === '/config/*') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    payload = {"status":"server ok"};
    response.write(JSON.stringify(payload));
    response.end();
  } else if(request.method === 'DELETE' && request.url === '/config/*') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    payload = {"status":"server ok"};
    response.write(JSON.stringify(payload));
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);