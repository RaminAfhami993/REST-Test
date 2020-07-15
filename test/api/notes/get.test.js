const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
process.env.NODE_ENV = 'test';


const app = require('../../../app.js');
const db = require('../../../db/index.js');

describe('GET /notes', () => {
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
  
    it('OK, get empty notes', (done) => {
      request(app).get('/notes')
        .then((res) => {
            const body = res.body;          
            expect(body).to.deep.equal([]);
            done();
        })
        .catch((err) => done(err));
    });

    it('OK, getting one note', (done) => {
        request(app).post('/notes')
          .send({ name: 'NOTE1', text: "text" })
          .then((res) => {
                request(app).get('/notes')
                .then((res) => {
                    expect(res.body.length).to.equal(1);
                    done();        
            })
            .catch(err => done(err))
        })  
        .catch((err) => done(err));
    });
})