var should = require('should');
var supertest = require('supertest');
var request = supertest('localhost:3000');

describe('image-diff', function() {
    it('Files are not same', function(done) {
       request.post('/image-diff')
              .set('Content-Type', 'multipart/form-data')
              .attach('image', '/home/admin1/microservices/imagediff/test/image/img1.png')
              .attach('image', '/home/admin1/microservices/imagediff/test/image/img2.png')
              .end(function(err, res) {
                if(res){
                  assert.equal('true', res.text);
                }
                done();
              });
    });

    it('Files are same', function(done) {
      request.post('/image-diff')
             .set('Content-Type', 'multipart/form-data')
             .attach('image', '/home/admin1/microservices/imagediff/test/image/img1.png')
             .attach('image', '/home/admin1/microservices/imagediff/test/image/img1.png')
             .end(function(err, res) {
               if(res){
                 assert.equal('false', res.text);
               }
               done();
             });
   });
});