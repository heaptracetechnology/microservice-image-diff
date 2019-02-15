var express = require("express");
var bodyParser = require("body-parser");
var fs1 = require('fs');
var fs2 = require('fs');
var fs = require('fs');
var PNG = require('pngjs').PNG;
var pixelmatch = require('pixelmatch');
var app = express();
var UPLOAD_TEMP_FOLDER = './uploads/';
app.use(bodyParser.json());
var HttpStatus = require('http-status-codes');


var message = {
    success: "false",
  };

app.post('/image-diff-by-base64', function (req, res) {

    var image1 = req.body.image1;
    var image2 = req.body.image2;
    res.setHeader('Content-Type', 'application/json');
    
    if (image1 == undefined || image2 == undefined) {
        message.error = "Required two argument image1 and image2, use base64 from of file data";
        return res.status(HttpStatus.BAD_REQUEST).send(message);
    }

    function getFullPathFileName(name) {
        return UPLOAD_TEMP_FOLDER + name + Date.now() + ".png";
    }

    var writeCount = 0;
    var fsr1;
    var fsr2;

    var readCount = 0;
    function doneReading() {
        if (++readCount < 2) return;
        var diff = new PNG({
            width: fsr1.width,
            height: fsr1.height
        });

        var diffpixcount = pixelmatch(fsr1.data, fsr2.data, diff.data, fsr1.width, fsr1.height, {
            threshold: 0.1
        });

        if (diffpixcount > 0) {
            var difffile = UPLOAD_TEMP_FOLDER + 'diff' + '-' + Date.now() + '.png';

            var converteddata = "";

            diff.pack().pipe(fs.createWriteStream(difffile).on('close', function () {
                var bitmap = fs.readFileSync(difffile);
                converteddata = new Buffer.from(bitmap).toString('base64');
                var ret = { name: "diff.png", content: converteddata, type: 'base64' };
                return res.status(HttpStatus.OK).send(ret);
            }));

        } else {
            console.log("The images are same");
            var ret = { name: "diff.png", content: "Images are same", type: 'base64' };
            return res.status(HttpStatus.OK).send(ret);
        }
    }

    function donewriting(fs, fd) {
        fs.close(fd, function (err) {
            if (err) {
                throw 'could not open file: ' + err;
            }
        });
        if (++writeCount < 2) return;

        fsr1 = fs.createReadStream(image1FilePath).pipe(new PNG()).on('parsed', doneReading);
        fsr2 = fs.createReadStream(image2FilePath).pipe(new PNG()).on('parsed', doneReading);
    }

    var image1FilePath = getFullPathFileName('image1');
    var image2FilePath = getFullPathFileName('image2');

    let buffer1 = Buffer.from(image1, 'base64');
    let buffer2 = Buffer.from(image2, 'base64');

    fs1.open(image1FilePath, 'w', function (err, fd1) {
        if (err) {
            throw 'could not open file: ' + err;
        }
        fs1.write(fd1, buffer1, 0, buffer1.length, null, donewriting.bind(this, fs1, fd1));
    });

    fs2.open(image2FilePath, 'w', function (err, fd2) {
        if (err) {
            throw 'could not open file: ' + err;
        }
        fs2.write(fd2, buffer2, 0, buffer2.length, null, donewriting.bind(this, fs2, fd2));
    });
});

app.listen((process.env.SERVER_PORT || 3000), function () {
    console.log("Working on port 3000");
});