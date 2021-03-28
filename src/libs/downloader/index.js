const fs = require('fs');
const axios = require('axios');

module.exports = (url, imageName) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                return response.data.pipe(fs.createWriteStream(imageName)).on('finish', () => resolve()).on('error', e => reject(e));
            }),
    );