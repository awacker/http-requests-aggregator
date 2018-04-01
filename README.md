### Description
Aggregator of several http-requests. As result, we can get info from several requests in one go.
### Usage
```bashp
npm install http-requests-aggregator
```
then add endpoint in your express application
```js
app.get('/api/resources', require('http-requests-aggregator'));
```
Example of final use

GET api/resources ? users=api/users & customer=api/customers/5abfaa03219765467a7e8b52 & countries=api/countries ..

returns {users: [..], customer: {..}, countries: [..] }

### Prerequisites
Node.js v6.14 or later needed.
