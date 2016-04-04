var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


describe('configs', function() {

  it('should respond to /config GET', function(done) {
  	chai.request('http://localhost:8080')
    	.get('/config')
    	.end(function(err, res){
      		res.should.have.status(200);
      		done();
    	});
  });

  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host1", "hostname": "nessus-ntp.lab.com", "port":1241,"username":"toto"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('token');

      done();
    });
  });

  
});