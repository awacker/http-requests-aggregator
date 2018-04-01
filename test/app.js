const express = require('express');
const bodyParser = require('body-parser');
const aggregator = require('../index');
const mock = require('./mock');

const users = mock.users;
const customers = mock.customers;
const countries = mock.countries;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/users', (req, res) => res.json(users));
app.get('/api/users/:id', (req, res) => res.json(users.find(o => o.id === +req.params.id)));
app.get('/api/customers', (req, res) => res.json(customers));
app.get('/api/customers/:id', (req, res) => res.json(customers.find(o => o.id === +req.params.id)));
app.get('/api/countries', (req, res) => res.json(countries));
app.get('/api/countries/:id', (req, res) => res.json(countries.find(o => o.id === +req.params.id)));
app.get('/api/resources', aggregator);

module.exports = app;
