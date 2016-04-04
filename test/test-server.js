var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


describe('configs', function() {


  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host1", "hostname": "nessus-ntp.lab.com", "port":1241,"username":"toto"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('id');

      done();
    });
  });

  it('should return an id on /config POST', function(done) {
  chai.request('http://localhost:8080')
    .post('/config')
    .send({"name": "host2", "hostname": "nessus-xml.lab.com", "port":3384,"username":"admin"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      expect(res.body).to.have.property('id');

      done();
    });
  });
  
  it('should respond to /config GET 1', function(done) {
    chai.request('http://localhost:8080')
      .get('/config/1')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.property('id');
          done();
      });
  });

  it('should respond to /config GET 2', function(done) {
    chai.request('http://localhost:8080')
      .get('/config/2')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.property('id');
          done();
      });
  });

  it('should list configs on /config with no parameter', function(done) {
    chai.request('http://localhost:8080')
      .get('/config')
      .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          expect(res.body).to.have.property('configs');
          done();
      });
  });

  it('should not respond to /config GET when no document', function(done) {
    chai.request('http://localhost:8080')
      .get('/config/3')
      .end(function(err, res){
          res.should.have.status(404);
          done();
      });
  });

  it('should delete /config DELETE', function(done) {
    chai.request('http://localhost:8080')
      .delete('/config/2')
      .end(function(err, res){
          res.should.have.status(200);
          done();
      });
  });

  
});