const fs = require('fs');
const axios = require('axios');
var mime = require('mime-types');

module.exports = (url, imagePath, imageName) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                response.data.pipe(fs.createWriteStream(imagePath+"/"+imageName+"."+mime.extension(response.headers["content-type"]))).on('finish', () => resolve()).on('error', e => reject(e));
            }),
    );