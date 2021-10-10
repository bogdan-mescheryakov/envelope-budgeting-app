const db = require('../models/index')
const app = require('../app')
let request = require('supertest');

jest.setTimeout(30000);

describe('envelopes-routes', () => {
    it('GET / envelopes - success', done => {
        request(app)
            .get('/envelopes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const resObject = response.body[0];
                expect(resObject).toEqual(
                    expect.objectContaining({
                        currentMoney: expect.any(String),
                        envelopeName: expect.any(String),
                        iconUrl: expect.any(String),
                        id: expect.any(Number),
                        isEmpty: false,
                        monthLimit: expect.any(String),
                        partOfBalance: null
                        })
                )
                done();
            })
            .catch(err => done(err))
    });
    
    it('GET / envelopes/:id - success', done => {
        request(app)
            .get('/envelopes/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const resObject = response.body;
                console.log(resObject);
                expect(resObject).toEqual({
                    currentMoney: expect.any(String),
                    envelopeName: expect.any(String),
                    iconUrl: expect.any(String),
                    id: expect.any(Number),
                    isEmpty: false,
                    monthLimit: expect.any(String),
                    partOfBalance: null
                    })
                done();
            })
            .catch(err => done(err))
    });   
});
