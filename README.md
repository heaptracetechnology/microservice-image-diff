# _Image Diff_ OMG Microservice

[![Open Microservice Guide](https://img.shields.io/badge/OMG%20Enabled-👍-green.svg?)](https://microservice.guide)

An OMG service to check difference in image content by pixel, this take two image and return diff image.

## Direct usage in [Storyscript](https://storyscript.io/):

##### Compare Images
```coffee
>>> image-diff compare image1:'base64data' image2:'base64data'
```

Curious to [learn more](https://docs.storyscript.io/)?

✨🍰✨

## Usage with [OMG CLI](https://www.npmjs.com/package/omg)

##### Compare Images
```shell
$ omg run compare -a image1=<base64_content> -a image2=<base64_content>
```

**Note**: the OMG CLI requires [Docker](https://docs.docker.com/install/) to be installed.

## License
[MIT License](https://github.com/omg-services/image-diff/blob/master/LICENSE).
