const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/route/search');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(port);

console.log('server started at port: ' + port);
