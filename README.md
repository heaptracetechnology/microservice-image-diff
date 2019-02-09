# Image Diff as a microservice
An OMG service to check difference in image content by pixel, this take two image and return diff image.

[![Open Microservice Guide](https://img.shields.io/badge/OMG-enabled-brightgreen.svg?style=for-the-badge)](https://microservice.guide)

This microservice's goal is to compare different images.

## [OMG](hhttps://microservice.guide) CLI

### OMG

* omg validate
```
omg validate
```
* omg build
```
omg build
```
### Test Service

* If File are same return false and if different return dif.png file .

### CLI
```sh
$ omg run imagediff -a image=<UPLOAD_IMAGE_PATH> -a image=<UPLOAD_IMAGE_PATH>
```

### Postman
```sh
* RUN with command "npm start"
* POST localhost:3000/image-diff
* Upload two images under form-data in Body
* form-data : Key/Value
* NOTE : Set Key type to File
* -- Key = image (for both images)
* -- Value = Upload files

```

## License
### [MIT](https://choosealicense.com/licenses/mit/)

## Docker
### Build
```
docker build --rm -f "Dockerfile" -t microservice-image-diff:latest .
```
### RUN
```
docker run -p3000:3000 microservice-image-diff:latest
```