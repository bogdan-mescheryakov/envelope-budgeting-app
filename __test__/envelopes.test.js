//const envelopes = require('../routers/envelopes');
const db = require('../models/index')
let request = require('supertest');

//const express = require('express');
const app = require('../app')
//const json = require('express').json;
/*const app = express();
const http = require('http').createServer(app).listen(3000);

app.use(json());
app.use(express.urlencoded({ extended: false }))
app.use('/envelopes', envelopes);
app.use('envelopes/1', envelopes);*/

jest.setTimeout(30000);

describe('GET/envelopes', () => {
    it('respondes with an array of json', done => {
        request(app)
            .get('/envelopes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const resObject = response.body[0];
                expect(resObject).toEqual(
                    expect.objectContaining(
                        {currentMoney: expect.any(String),
                            envelopeName: expect.any(String),
                            iconUrl: expect.any(String),
                            id: expect.any(Number),
                            isEmpty: false,
                            monthLimit: expect.any(String),
                            partOfBalance: null
                        }
                    )
                )
                done();
            })
            .catch(err => done(err))
        });
    });
    describe('GET/envelopes/:id', () => {
        afterAll(() => {
            db.sequelize.close()
            //http.close()
        });
        it('respondes with a json object', done => {
            request(app)
                .get('/envelopes/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    const resObject = response.body;
                    console.log(resObject);
                    expect(resObject).toEqual(
                        {currentMoney: expect.any(String),
                                envelopeName: expect.any(String),
                                iconUrl: expect.any(String),
                                id: expect.any(Number),
                                isEmpty: false,
                                monthLimit: expect.any(String),
                                partOfBalance: null
                            }
                            )
                    done();
                })
                .catch(err => done(err))
            });
    });
