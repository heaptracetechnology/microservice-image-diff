var supertest = require('supertest');
var request = supertest('localhost:3000');
var fs = require('fs');
var SERVER_URL = "http://localhost:3000/image-diff-by-base64";

describe('image-diff-by-base64', function() {
    it('Files are not same', function (done) {
      var Image1 = `${__dirname}/image/img1.png`;
      var Image2 = `${__dirname}/image/img2.png`;
      var base64image1Data = fs.readFileSync(Image1, { encoding: "base64" });
      var base64image2Data = fs.readFileSync(Image2, { encoding: "base64" });
      request.post({
          url: SERVER_URL,
          body: "{\"image1\":\""+ base64image1Data+"\",\"image2\":\""+ base64image2Data+"\"}"
      }, function (error, response, body) {
          assert.notEqual(response.body.content, null);
      });
      done();
  });

    it('Files are same', function (done) {
      var Image1 = `${__dirname}/image/img1.png`;
      var Image2 = `${__dirname}/image/img2.png`;
      var base64image1Data = fs.readFileSync(Image1, { encoding: "base64" });
      var base64image2Data = fs.readFileSync(Image2, { encoding: "base64" });
      request.post({
          url: SERVER_URL,
          body: "{\"image1\":\""+ base64image1Data+"\",\"image2\":\""+ base64image2Data+"\"}"
      }, function (error, response, body) {
          assert.equal(response.body.content, "Image are same");
      });
      done();
  });
});