var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var chaihttp = require('chai-http');
chai.use(require('chai-fs'));
chai.use(chaihttp);
require('../index.js');

var file = path.join(__dirname, '..', 'file.txt');
var reqString = 'some string';
describe('POST request to server', function () {

  beforeEach(function () {
      fs.unlinkSync(file);
  })

  it('create a file if none exist', function (done) {
    expect(file).to.not.be.a.path;
    chai.request('localhost:3000')
      .post('/')
      .send(reqString)
      .end(function (err, res) {
        expect(file).to.be.a.file;
        done();
      })
  });

  it('write req content to file', function (done) {

    chai.request('localhost:3000')
      .post('/')
      .send(reqString)
      .end(function (err, res) {
        expect(file).to.be.a.file().and.not.empty

        done();
      })

  });

  it('create a file with req content', function (done) {
    chai.request('localhost:3000')
      .post('/')
      .send(reqString)
      .end(function (err, res) {
        assert.fileContent(file, reqString)

        done();
       });
    });
});

describe('2 post requests to server', function () {
  before(function () {
    fs.unlinkSync(file);
  });

  it('respond with request content in first request', function (done) {
    chai.request('localhost:3000')
      .post('/')
      .send(reqString)
      .end(function (err, res) {
        expect(res.text).to.equal(reqString);
        done();
    });
  });
  it('respond with file content in second request', function (done) {
   chai.request('localhost:3000')
    .post('/')
    .send('other string')
    .end(function (err, res) {
      expect(res.text).to.equal(reqString);
      done();
    });
  });
  it('should write to file last sent string', function (done) {
    assert.fileContent(file, 'other string')
    done();
  })
});

