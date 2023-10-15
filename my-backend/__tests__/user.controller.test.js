/**
 * Test Framework: https://mochajs.org/
 * Assertions: https://www.chaijs.com/
 * Library: https://www.npmjs.com/package/supertest
*/
import {expect, assert, should} from 'chai';
import request from 'supertest';
import app from '../server.js';

before(async () => {
    // Add a delay before running tests so DB connections can be made
    await new Promise((resolve) => setTimeout(resolve, 1000));
})

// Router starts at /pizza
describe('POST pizza/user/login', () => { 
    it('should require a username', (done) => {
        const payload = {password: "123"};
        request(app)
            .post('/pizza/user/login')
            .send(payload)
            .expect(400) // Bad Request
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("A username is required.");
                done();
            })
    })

    it('should require a password', (done) => {
        const payload = {username: "johnny"};
        request(app)
            .post('/pizza/user/login')
            .send(payload)
            .expect(400) // Bad Request
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("A password is required.");
                done();
            })
    })

    it ('should not authorize invalid users', (done) => {
        const payload = {username: "johnny", password: "123"};
        request(app)
            .post('/pizza/user/login')
            .send(payload)
            .expect(401) // Not authorized
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("Access denied. Could not authenticate user.");
                done();
            })
    })

    it('should return a token to a valid user', (done) => {
        const payload = {username: "unit_test", password: "samspizza&more_test_do_not_change!"};
        request(app)
            .post('/pizza/user/login')
            .send(payload)
            .expect(200) // OK
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.token).to.exist;
                expect(res.body.token).to.be.a("string");
                done();
            })
    })
})