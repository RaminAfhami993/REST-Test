const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
process.env.NODE_ENV = 'test';


const app = require('../../../app.js');
const db = require('../../../db/index.js');

describe('POST /notes', () => {
    before((done) => {
      db.connect()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    after((done) => {
        mongoose.connection.db.dropDatabase()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        db.close()
            .then(() => done())
            .catch((err) => done(err));
    })
  
    it('OK, creating a new note works', (done) => {
      request(app).post('/notes')
        .send({ name: 'NOTE', text: "AAA" })
        .then((res) => {
          const body = res.body;
          expect(body).to.contain.property('_id');
          expect(body).to.contain.property('name');
          expect(body).to.contain.property('text');
          done();
        })
        .catch((err) => done(err));
    });
})