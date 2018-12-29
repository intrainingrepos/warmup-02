'use strict';

const express = require('express');
const app = express();

//ejs template setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//static routes
app.use(express.static(`${__dirname}/public`));

//app middleware
app.use(express.json());

//routes
app.get('/', (req,res) => {
  res.send('<h1>Hello From /</h1>');
});

app.post('/save', (req,res) => {
  res.json(req.body);
});

app.get('/err', (req,res,next) => {
  next('this is a huge error');
});

app.get('*', (req,res) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('not-found', {request:req});
});

app.use((err,req,res,next) => {
  res.status(500);
  res.statusMessage = 'server error';
  res.render('error', {request:req, error:err});
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log('server up on port', port));
  },
};