'use strict';

require('dotenv').config();

const supergoose = require('cf-supergoose');
const server = require('../src/server.js');

const mockRequest = supergoose.server(server.server);

jest.spyOn(global.console, 'log');

beforeAll(() => {
  supergoose.startDB();
});

afterAll(() => {
  supergoose.stopDB();
});

describe('testing sign up', () => {

  it('should return token when user signs up', (done) => {

    let user = { username: 'test', password: 'password' };
    return mockRequest.post('/signup')
      .send(user)
      .then(results => {
        expect(results.text).not.toBe(null);
        expect(results.text).not.toEqual('user already exists');
        done();
      })
      .catch(err => console.log(err));
  });


  it('should return message when user is already signed up', (done) => {

    let user = { username: 'test', password: 'password' };
    return mockRequest.post('/signup')
      .send(user)
      .then(results => {
        expect(results.text).not.toBe(null);
        expect(results.text).toEqual('user already exists');
        done();
      })
      .catch(err => console.log(err));
  });
});

describe('testing get users', () => {


  it('should return users', (done) => {

    let user = { username: 'test2', password: 'password' };
    return mockRequest.post('/signup')
      .send(user)
      .then(results => {
        return mockRequest.get('/users');
      })
      .then(results => {
        expect(results.body.count).toBe(2);
        expect(results.body.results[0].username).toEqual('test');
        expect(results.body.results[1].username).toEqual('test2');
        done();
      })
      .catch(err => console.log(err));
  });
});

describe('testing sign in', () => {


  it('should be able to sign in', (done) => {

    let user = { username: 'test', password: 'password' };
    return mockRequest.post('/signin').set('Authorization', 'basic dGVzdDpwYXNzd29yZA==').send(user)
      .then(results => {
        expect(results.body.token).not.toBe(null);
        expect(results.body.user.username).toEqual('test');
        done();
      })
      .catch(err => console.log(err));
  });
});

describe('testing secret', () => {


  it('should be able to access secret with token', (done) => {

    let user = { username: 'test', password: 'password' };
    return mockRequest.post('/signin').set('Authorization', 'basic dGVzdDpwYXNzd29yZA==').send(user)
      .then(results => {
        let token = results.body.token;
        user = { username: 'test', password: 'password' };
        return mockRequest.get('/secret').set('Authorization', `bearer ${token}`).send(user)
          .then(results => {
            expect(results.body.username).toEqual('test');
            done();
          })
          .catch(err => console.log(err));
      });
  });
});