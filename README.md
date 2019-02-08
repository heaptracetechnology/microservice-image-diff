# Image Diff as a microservice
An OMG service to check difference in image content

[![Open Microservice Guide](https://img.shields.io/badge/OMG-enabled-brightgreen.svg?style=for-the-badge)](https://microservice.guide)

This microservice's goal is to compare different images.

## [OMG](hhttps://microservice.guide) CLI

### OMG

* omg validate
* omg build

### Test Service

* If File are same return false and if different return true

### CLI
```sh
$ omg exec image-diff -a image=<UPLOAD_IMAGE_PATH> -a image=<UPLOAD_IMAGE_PATH>
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

### License
[MIT](https://choosealicense.com/licenses/mit/)