var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var fs = require('fs');
var PNG = require('pngjs').PNG;
var pixelmatch = require('pixelmatch');
var app = express();
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');

    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).array('image', 2);

app.post('/image-diff', function (req, res) {
    upload(req, res, function (err) {

        if (req.files.length >= 2) {
            var img1 = fs.createReadStream(req.files[0].path).pipe(new PNG()).on('parsed', doneReading),
                img2 = fs.createReadStream(req.files[1].path).pipe(new PNG()).on('parsed', doneReading),
                filesRead = 0, ret;

            function doneReading() {
                if (++filesRead < 2) return;
                var diff = new PNG({ width: img1.width, height: img1.height });

                var diff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

                if (diff > 0) {
                    res.end("true");
                } else {
                    res.end("false");
                }

            }
        } else {
            ret = 'Please upload two images to compare';
            res.writeHead(200, { 'Content-Length': Buffer.byteLength(ret), 'Content-Type': 'text/plain' })
            res.end(ret)
        }
        if (err) {
            return res.end("Error uploading file.", err);
        }

    });
});

app.listen((process.env.PUBSUB_PORT || 3000), function () {
    console.log("Working on port 3000");
});