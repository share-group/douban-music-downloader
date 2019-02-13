const fs = require('fs');
const request = require('request');

/**
 * 下载文件
 * @param url 文件下载地址
 * @param filename 文件本地地址
 */
module.exports.download = async function (url, filename) {
  const options = {method: 'GET', url};
  return new Promise(((resolve) => {
    const stream = fs.createWriteStream(filename);
    request(Object.assign({}, options, {rejectUnauthorized: false})).pipe(stream).on('close', () => {
      resolve(filename);
    });
  })).catch((e) => {
    console.error(e);
  });
};