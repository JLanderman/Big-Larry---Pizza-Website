/**
 * Sample setup for testing API routes
 * Refer to routes/Pizza.route.js for routes to test
 * Test Framework: https://mochajs.org/
 * Library: https://www.npmjs.com/package/supertest
 */
import request from 'supertest';
import app from '../server.js';

describe('server.js get /', () => {
    it('should return a "Hello Backend World" message', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const message = res.text;
                if (message == "Hello Backend World") done();
                else done(new Error(`Unexpected response message, ${message}`));
            })
    })
})
