const express = require('express');
const cors = require('cors');

require('./models/User');
require('./models/Game'); 

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

module.exports = app;