'use strict';

const {server} = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);


describe('web server', () => {

  it('will respond sending out a 500 route that will throw an error', () => {

    return mockRequest
      .get('/err')
      .then(results => {
        expect(results.status).toBe(500);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('will respond sending out a 404 route that is invalid', () => {

    return mockRequest
      .get('/foobar')
      .then(results => {
        expect(results.status).toBe(404);
      })
      .catch(err => {
        expect(err).not.toBeDefined();
      });
  });

  it('will be able to post to /save', ()  => {

    let obj = {title:'foo', article:'some text', author:'person'};

    return mockRequest
      .post('/save')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body).toEqual(obj);
      })
      .catch( err => console.error('err', err) );
  });
});