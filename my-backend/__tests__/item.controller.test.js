/**
 * Test Framework: https://mochajs.org/
 * Assertions: https://www.chaijs.com/
 * Library: https://www.npmjs.com/package/supertest
*/
import {expect, assert, should} from 'chai';
import request from 'supertest';
import app from '../server.js';

// TODO. Refer to server.test.js and Pizza.route.test.js for examples