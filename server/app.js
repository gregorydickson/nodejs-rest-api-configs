var http = require('http');
var loki = require('lokijs');
var URL = require('url');
var db = new loki('config.json');
var configs = [];
var ids = 0;


console.log('server running at http://localhost:8080');



http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  console.log("URL: "+url);
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

      
      
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');


      response.on('error', function(err) {
        console.error(err);
      });
      
      response.write(JSON.stringify(configs));
      response.end();
      
    });

  //GET a config
  } else if(request.method === 'GET' && request.url.match(/\/config\/*/)){ 
    
    request.on('error', function(err) {
      console.error(err);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      var configId = url.match(/\d{1,5}/);
      var aConfig = null;
      console.log("config doc id:"+configId);
      for(var i=0; i < configs.length; i++){
        if(configs[i].id == configId){
          aConfig = configs[i];
          break;
        }
      }
      
      if(aConfig){
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(aConfig));
        response.end();
      } else {
        response.statusCode = 404;
        response.end();
      }

      response.on('error', function(err) {
        console.error(err);
      });
      
            
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
      ids = ids++;
      data.id = ids;
      configs.push(data);
      var payload = JSON.stringify(data);
      
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');

      response.on('error', function(err) {
        console.error(err);
      });
      
      response.write(payload);
      response.end();
    });
  // UPDATE
  } else if(request.method === 'PUT' && request.url.match(/\/config\/*/)){ 

    body = Buffer.concat(body).toString();
    var data = JSON.parse(body);
    var aConfig = configs.update(configId);
    if(aConfig){
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      payload = {"status":"server ok"};
      response.write(JSON.stringify(payload));
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }

  } else if(request.method === 'DELETE' && request.url.match(/\/config\/*/)) {
    var configId = url.match(/\d{1,5}/);
    console.log("config doc id:"+configId);
    var aConfig = configs.get(configId);

    if(aConfig){
      aConfig = configs.remove(aConfig);
      response.statusCode = 200;
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);

