/**
 * Test Framework: https://mochajs.org/
 * Assertions: https://www.chaijs.com/
 * Library: https://www.npmjs.com/package/supertest
*/
import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';

describe('ItemController', () => {
  // Sample ObjectID for testing
  const validObjectId = '6504e390896626f733ef4b97';
  const lunchValidObjectId = '65069a157e453614c411737f'
  describe('apiGetItem', () => {
    it('should return a valid item for a valid ObjectID', (done) => {
        request(app)
          .get(`/pizza/items?_id=${validObjectId}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
      
            //console.log('Response:', res.body); // Log the response with a custom identifier
      
            const items = res.body;
      
            if (items && items.length > 0) {
              const item = items[0]; // Assuming you expect a single item
              expect(item).to.be.an('object');
              expect(item.name).to.equal('Garlic Chicken');
              expect(item.itemCategory).to.equal('pizzaSpecial');
              // Add more assertions based on your data structure
            } else {
              done(new Error('No item found in the response.'));
            }
      
            done();
          });
      });

    // Other test cases go here
  }); // end apiGetItem test
  describe('apiGetLunch', () => {
    it('should return a valid lunch item for a valid ObjectID', (done) => {
      request(app)
        .get(`/pizza/lunchItems?_id=${lunchValidObjectId}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          //console.log('Response:', res.body); // Log the response with a custom identifier

          const lunchItems = res.body;

          if (lunchItems && lunchItems.length > 0) {
            const lunchItem = lunchItems[0]; // Assuming you expect a single lunch item
            expect(lunchItem).to.be.an('object');
            // Add more assertions based on your data structure
          } else {
            done(new Error('No lunch item found in the response.'));
          }

          done();
        });
    });
    
  }); // end apiGetLunch test
  describe('apiGetPizzaSpecial', () => {
    it('should return a list of pizza special items', (done) => {
      request(app)
        .get('/pizza/pizzaSpecial')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          const items = res.body.item;
  
          if (items && items.length > 0) {
            // If there are items in the response, it's a success
            done();
          } else {
            done(new Error('No pizza special items found in the response.'));
          }
        });
    });
  }); // end getPizzaSpecial block
  describe('apiGetComboSpecial', () => {
    it('should return a list of combo special items', (done) => {
      request(app)
        .get('/pizza/comboSpecial')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          const items = res.body.item;
  
          if (items && items.length > 0) {
            // If there are items in the response, it's a success
            done();
          } else {
            done(new Error('No combo special items found in the response.'));
          }
        });
    });
  }); // end comboSpecial
  describe('apiGetSpecialDeals', () => {
    it('should return a list of special deal items', (done) => {
      request(app)
        .get('/pizza/specialDeals')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
  
          const items = res.body.item;
  
          if (items && items.length > 0) {
            // If there are items in the response, it's a success
            done();
          } else {
            done(new Error('No special deal items found in the response.'));
          }
        });
    });
  }); // end getSpecialDeals
  /*
  * TODO:
  * fix putItem and get tests up
  * create deleteItem, modifyItem, create tests
  * unify database fields/schema
  */

}); // end itemController test block