/**
 * Sample setup for testing API routes
 * Refer to routes/Pizza.route.js for routes to test and put them 
 * in files for their respective controllers
 * Test Framework: https://mochajs.org/
 * Library: https://www.npmjs.com/package/supertest
*/
import request from 'supertest';
import app from '../server.js';

describe('Pizza.route.js get /pizza', () => { // Pizza Router starts at /pizza
    it('should return a "Hello Pizza World" message', (done) => {
        request(app)
            .get('/pizza')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const message = res.text;
                if (message == "Hello Pizza World") done();
                else done(new Error(`Unexpected response message, ${message}`));
            })
    })
})

describe('Pizza.route.js get /pizza/cheese', () => { // Pizza Router starts at /pizza
    it('should return a "Hello Cheese Pizza World" message', (done) => {
        request(app)
            .get('/pizza/cheese')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const message = res.text;
                if (message == "Hello Cheese Pizza World") done();
                else done(new Error(`Unexpected response message, ${message}`));
            })
    })
})