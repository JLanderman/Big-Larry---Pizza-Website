/**
 * Test Framework: https://mochajs.org/
 * Assertions: https://www.chaijs.com/
 * Library: https://www.npmjs.com/package/supertest
*/
import {expect} from 'chai';
import request from 'supertest';
import app from '../server.js';
let curPal;

before(async () => {
    // Add a delay before running tests so DB connections can be made
    await new Promise((resolve) => setTimeout(resolve, 1000));
})

describe('GET pizza/palettes', () => { 
    it('should get the last ten used color palettes', (done) => {
        request(app)
            .get('/pizza/palettes')
            .expect(200) // OK
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.palettes).to.be.an("array");
                done();
            })
    })
})

describe('GET pizza/palettes/current', () => { 
    it('should get the currently used color palette', (done) => {
        request(app)
            .get('/pizza/palettes/current')
            .expect(200) // OK
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.palette).to.be.an("array");
                curPal = res.body.palette;
                done();
            })
    })
})

describe('POST pizza/palettes/add', () => { 
    it('should change the current palette', (done) => {
        const payload = {name: "Original", colorArr: ['#ebb67b', '#fffbd3','#6353d8', '#5121a3','#130e2c', '#ceb4f7','#feff9b', '#d35eff'], username: "unit_test", token: process.env.TESTING_TOKEN_OG}
        request(app)
            .post('/pizza/palettes/add')
            .send(payload)
            .expect(201) // OK
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.message).to.equal("Palette updated");
                done();
            })
    })

    it('should not update palette with invalid token', (done) => {
        const payload = {name: "Original", colorArr: ['#ebb67b', '#fffbd3','#6353d8', '#5121a3','#130e2c', '#ceb4f7','#feff9b', '#d35eff'], username: "unit_test", token: ';lskdjg;lasjgl;dsajg;jsda;ljg;'}
        request(app)
            .post('/pizza/palettes/add')
            .send(payload)
            .expect(400)
            .end((err, res) => {``
                if (err) return done(err);
                expect(res.text).to.equal("Invalid Token");
                done();
            })
    })

    it('should not update palette with not matching user and token', (done) => {
        const payload = {name: "Original", colorArr: ['#ebb67b', '#fffbd3','#6353d8', '#5121a3','#130e2c', '#ceb4f7','#feff9b', '#d35eff'], username: "Johnny", token: process.env.TESTING_TOKEN_OG}
        request(app)
            .post('/pizza/palettes/add')
            .send(payload)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("Unauthorized User");
                done();
            })
    })

    it('should not update palette with missing name', (done) => {
        const payload = {colorArr: ['#ebb67b', '#fffbd3','#6353d8', '#5121a3','#130e2c', '#ceb4f7','#feff9b', '#d35eff'], username: "unit_test", token: process.env.TESTING_TOKEN_OG}
        request(app)
            .post('/pizza/palettes/add')
            .send(payload)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("No palette name");
                done();
            })
    })

    it('should not update palette with not enough colors set', (done) => {
        const payload = {name: "something", colorArr: ['#ebb67b', '#fffbd3','#6353d8', '#5121a3','#130e2c', '#ceb4f7','#feff9b'], username: "Johnny", token: process.env.TESTING_TOKEN_OG}
        request(app)
            .post('/pizza/palettes/add')
            .send(payload)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal("Color Palette too short");
                done();
            })
    })
})
