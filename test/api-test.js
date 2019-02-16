var supertest = require('supertest');
var request = supertest('localhost:3000');
var fs = require('fs');
const nock = require('nock');
var SERVER_URL = "http://localhost:3000/image-diff-by-base64";

describe('Compare different images with base64 data', function() {

    beforeEach(() => {
        nock('http://localhost:3000')
            .post('/image-diff-by-base64')
            .reply(200, [{ "name": "diff.png", "content": "base64data=", "type": "base64"}])
    });
    it('Compare different images with base64 data', function (done) {

        request.post({
            url: 'http://localhost:3000/image-diff-by-base64',
        }, function (error, response) {
            var res = JSON.parse(response.body);
            expect(typeof res).to.equal('object');
            expect(res.name).to.equal("diff.png");
            expect(res.content).to.equal('base64data=');
            expect(res.type).to.equal('base64');
        });
        done();
    });
});


describe('Compare same images with base64 data', function() {

    beforeEach(() => {
        nock('http://localhost:3000')
            .post('/image-diff-by-base64')
            .reply(200, [{ "name": "diff.png", "content": "Images are same", "type": "base64"}])
    });
    it('Compare same images with base64 data', function (done) {

        request.post({
            url: 'http://localhost:3000/image-diff-by-base64',
        }, function (error, response) {
            var res = JSON.parse(response.body);
            expect(typeof res).to.equal('object');
            expect(res.name).to.equal("diff.png");
            expect(res.content).to.equal('Images are same');
            expect(res.type).to.equal('base64');
        });
        done();
    });
});