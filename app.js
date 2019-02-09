var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var fs = require('fs');
var PNG = require('pngjs').PNG;
var pixelmatch = require('pixelmatch');
var app = express();
app.use(bodyParser.json());
var UPLOAD_TEMP_FOLDER = './uploads/';

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, UPLOAD_TEMP_FOLDER);

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

                var diffpixcount  = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

                if (diffpixcount > 0) {
                   
                    var difffile  =  UPLOAD_TEMP_FOLDER + 'diff' + '-' + Date.now() + '.png';
                    diff.pack().pipe(fs.createWriteStream(difffile));
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": "attachment; filename=diff.png"
                      });
                    
                    fs.createReadStream(difffile).pipe(res);
                    fs.unlinkSync(difffile);

                } else {
                    res.end("false");
                }
              
                fs.unlinkSync(req.files[0].path);
                fs.unlinkSync(req.files[1].path);
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