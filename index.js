'use strict'

const http = require('http');

module.exports = (req, res, next) => {
  const pathWhere = req.get('host').split(':');
  const options = {
    hostname: pathWhere[0],
    port: pathWhere[1],
    timeout: 10000,
    headers: req.headers
  };

  res.setHeader('Content-Type', 'application/json');
  res.write('{');
  var firstScrapExist = false;

  const checkResponse = r => r.statusCode === 200 && r.headers['content-type'].includes('application/json');

  const runRequest = (param, path) => {
    return new Promise(resolve => {
      http.get({...options, ...{path: `/${path}`}}, response => {
        if (!checkResponse(response)) return resolve(`{"${param}":{"statusCode": ${response.statusCode}, "statusMessage": "${response.statusMessage}"}}`);
        firstScrapExist ? res.write(`,`) : firstScrapExist = true;
        res.write(`"${param}":`);
        response.on('data', scrap => res.write(scrap));
        response.on('end', () => resolve());
        response.on('error', error => reject(error));
      });
    });
  };

  const errorsPack = e => {
    let errors = e.filter(item => item);
    if (errors.length == 0) return;
    if (firstScrapExist) res.write(`,`);
    res.write(`"errors":[${errors.join(",")}]`);
  }

  Promise.all(Object.keys(req.query).map(param => runRequest(param, req.query[param])))
  .then((e) => {
    errorsPack(e);
    res.write('}');
    res.send();
  });

}
