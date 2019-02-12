'use strict';

const express = require('express');
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

app.use(express.json());

app.get('/', (req,res) => {
  res.send('<h1>Hello from /</h1>');
});

app.post('/save', (req,res) => {
  res.json(req.body);
});

app.get('/err', (req,res,next) => {
  next('this is a hughe error');
});

app.get('*', (req,res) => {
  res.status(404);
  res.statusMessage = 'server error';
  res.render('error', {request:req, error:err});
});

app.use((err,req,res,next) => {
  res.status(500);
  res.statusMessage = 'server error';
  res.render('error', {request:rq, error:err});
});

module.exports ={
  server: app,
  start: (port) => {
    app.listen(port, () =>  console.log('server up on port', port));
  },
};