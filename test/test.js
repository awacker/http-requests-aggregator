const chai = require('chai');
const axios = require('axios');

const app = require('./app');
const mock = require('./mock');

const expect = chai.expect;

const users = mock.users;
const customers = mock.customers;
const countries = mock.countries;

const conditions = {
  test1: {
    desc:  'Check users all:',
    url:   '/api/users',
    expect: users
  },
  test2: {
    desc:  'Check user 3:',
    url:   '/api/users/3',
    expect: users[2]
  },
  test3: {
    desc:  'Check customers all:',
    url:   '/api/customers',
    expect: customers
  },
  test4: {
    desc:  'Check countries all:',
    url:   '/api/countries',
    expect: countries
  },
  test5: {
    desc:  'Check resources - all customers and user 2:',
    url:   '/api/resources?user=api/users/2&customers=api/customers',
    expect: {user: users[1], customers: customers}
  },
  test6: {
    desc:  'Check resources - all countries:',
    url:   '/api/resources?countries=api/countries',
    expect: {countries: countries}
  },
  test7: {
    desc:  'Check resources - all users, customer 11 and all countries:',
    url:   '/api/resources?user=api/users&customers=api/customers/11&country=api/countries',
    expect: {user: users, customers: customers[0], country: countries}
  }
}

describe('GET requests', function(){
  let server;
  let serverPath;

  before(function() {
    server = app.listen(process.env.PORT || 1313);
    serverPath = `http://localhost:${server.address().port}`;
  });

  after(function() {
    server.close();
  });

  it(`${conditions.test1.desc} ${conditions.test1.url}`, function(done) {
    axios.get(`${serverPath}${conditions.test1.url}`)
      .then(result => {
        expect(result.data).to.deep.equal(conditions.test1.expect);
        done();
      })
      .catch(e => done(e));
  });

  it(`${conditions.test2.desc} ${conditions.test2.url}`, function(done) {
    axios.get(`${serverPath}${conditions.test2.url}`)
      .then(result => {
        expect(result.data).to.deep.equal(conditions.test2.expect);
        done();
      })
      .catch(e => done(e));
  });

  it(`${conditions.test3.desc} ${conditions.test3.url}`, function(done) {
    axios.get(`${serverPath}${conditions.test3.url}`)
      .then(result => {
        expect(result.data).to.deep.equal(conditions.test3.expect);
        done();
      })
      .catch(e => done(e));
  });

  it(`${conditions.test4.desc} ${conditions.test4.url}`, function(done) {
    axios.get(`${serverPath}${conditions.test4.url}`)
      .then(result => {
        expect(result.data).to.deep.equal(conditions.test4.expect);
        done();
      })
      .catch(e => done(e));
  });

  it(`${conditions.test5.desc} ${conditions.test5.url}`, function(done) {
    axios.get(`${serverPath}${conditions.test5.url}`)
      .then(result => {
        expect(result.data).to.deep.equal(conditions.test5.expect);
        done();
      })
      .catch(e => done(e));
  });

  it(`${conditions.test6.desc} ${conditions.test6.url}`, function(done) {
    axios.get(`${serverPath}${conditions.test6.url}`)
      .then(result => {
        expect(result.data).to.deep.equal(conditions.test6.expect);
        done();
      })
      .catch(e => done(e));
  });

  it(`${conditions.test7.desc} ${conditions.test7.url}`, function(done) {
    axios.get(`${serverPath}${conditions.test7.url}`)
      .then(result => {
        expect(result.data).to.deep.equal(conditions.test7.expect);
        done();
      })
      .catch(e => done(e));
  });
});
