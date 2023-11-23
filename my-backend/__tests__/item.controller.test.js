/**
 * Test Framework: https://mochajs.org/
 * Assertions: https://www.chaijs.com/
 * Library: https://www.npmjs.com/package/supertest
*/
import { expect } from 'chai';
import request from 'supertest';
import app from '../server.js';
let addItem;
let addItemTwo;

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
              expect(item.name).to.equal('Pepperoni');
              expect(item.itemCategory).to.equal('pizzaSpecial');
              // Add more assertions based on your data structure
            } else {
              done(new Error('No item found in the response.'));
            }
      
            done();
          });
      });

      it('should return an error for invalid object id', (done) => {
        request(app)
          .get(`/pizza/items?_id=${"a;sldkg;asldjg;sadglk;jag"}`)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
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

  describe('apiGetDrink', () => {
    it('should return a list of drink items', (done) => {
      request(app)
        .get('/pizza/drink')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object')
            done();
        });
    });
  }); // end getDrink

  describe('apiGetToppingPrice', () => {
    it('should return a list of prices for topping', (done) => {
      const payload = {topping: "Cheese"}
      request(app)
        .post('/pizza/customToppings')
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object')
          expect(res.body.price_p).to.equal('$4.99')
          done();
        });
    });

    it('should not return a list of prices for topping', (done) => {
      const payload = {topping: "Mystery"}
      request(app)
        .post('/pizza/customToppings')
        .send(payload)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Topping not found')
          done();
        });
    });

    it('should return all topping prices', (done) => {
      request(app)
        .get('/pizza/allToppingsPrices')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
            expect(res.body).to.be.an('array')
            done();
        });
    });
  }) // end getToppingPrice

  describe('apiUpdateToppingPrice', () => {

    it('should update price for topping and size', (done) => {
      const payload = {topping: "Cheese", size: "price_p", price: "5.99", username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/customToppings/update')
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Price updated successfully')
          done();
        });
    });

    it('should update price for topping and size', (done) => {
      const payload = {topping: "Cheese", size: "price_p", price: "4.99", username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/customToppings/update')
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Price updated successfully')
          done();
        });
    });

    it('should not update for unknown topping', (done) => {
      const payload = {topping: "mystery", size: "price_p", price: "4.99", username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/customToppings/update')
        .send(payload)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal('Topping not found')
          done();
        });
    });

    it('should not update for bad token', (done) => {
      const payload = {topping: "mystery", size: "price_p", price: "4.99", username: "unit_test", token: "a;sodgh;aslg;kldsas"}
      request(app)
        .post('/pizza/customToppings/update')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Invalid Token')
          done();
        });
    });

    it('should not update for token not matching user', (done) => {
      const payload = {topping: "mystery", size: "price_p", price: "4.99", username: "Johnny", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/customToppings/update')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Unauthorized User')
          done();
        });
    });

    it('should not update for missing topping info', (done) => {
      const payload = {size: "price_p", price: "4.99", username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/customToppings/update')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('No topping selected')
          done();
        });
    });

    it('should not update when size is different', (done) => {
      const payload = {topping: "mystery", size: "small", price: "5.99", username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/customToppings/update')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('No such size')
          done();
        });
    });

  }) // end updateToppingPrice

  describe('apiPutItem', () => {
    it('should add item to database', (done) => {
      const payload = {name: 'testFood', itemCategory: 'lunch/Dinner', photo: 'random.png', price: 666, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems')
        .send(payload)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Item inserted successfully")
          addItem = res.body.itemID.valueOf();
          done();
        });
    });

    it('should add item with two prices to database', (done) => {
      const payload = {name: 'testFood1', itemCategory: 'lunch/Dinner', photo: 'random.png', price_large: 666, price_small: 333, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems')
        .send(payload)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Item inserted successfully")
          addItemTwo = res.body.itemID.valueOf();
          done();
        });
    });

    it('should not add item without token', (done) => {
      const payload = {name: 'testFood1', itemCategory: 'lunch/Dinner', photo: 'random.png', price_large: 666, price_small: 333, username: "unit_test"}
      request(app)
        .post('/pizza/allItems')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("No Token")
          done();
        });
    });

    it('should return bad token', (done) => {
      const payload = {name: 'testFood1', itemCategory: 'lunch/Dinner', photo: 'random.png', price_large: 666, price_small: 333, username: "unit_test", token: "al;ksjdhgl;ksa"}
      request(app)
        .post('/pizza/allItems')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Invalid Token')
          done();
        });
    });

    it('should not add item with nonmatching username and token', (done) => {
      const payload = {name: 'testFood1', itemCategory: 'lunch/Dinner', photo: 'random.png', price_large: 666, price_small: 333, username: "Johnny", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal('Unauthorized User')
          done();
        });
    });

  }) // end putItem

  describe('apiModifyItem', () => {
    it('should modify item from database', (done) => {
      const payload = {curName: 'testFood', curItemCat: 'lunch/Dinner', newName: 'testFood2', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', newPrice: 777, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Item modified successfully")
          done();
        });
    });

    it('should modify item with two prices from database', (done) => {
      const payload = {curName: 'testFood1', curItemCat: 'lunch/Dinner', newName: 'testFood3', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', price_large: 777, price_small: 666, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Item modified successfully")
          done();
        });
    });

    it('should not modify item with no user recieved', (done) => {
      const payload = {curName: 'testFood', curItemCat: 'lunch/Dinner', newName: 'testFood2', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', newPrice: 777, token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("No username")
          done();
        });
    });

    it('should not modify item with not matching token and user', (done) => {
      const payload = {curName: 'testFood', curItemCat: 'lunch/Dinner', newName: 'testFood2', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', newPrice: 777, username: "Johnny",token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Unauthorized User")
          done();
        });
    });

    it('should not modify item with no matching token and user', (done) => {
      const payload = {curName: 'testFood', curItemCat: 'lunch/Dinner', newName: 'testFood2', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', newPrice: 777, username: "unit_test", token: ";lsadkjga;lgjsa"}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Invalid Token")
          done();
        });
    });

    it('should not modify item that does not exist', (done) => {
      const payload = {curName: 'testFood5', curItemCat: 'lunch/Dinner', newName: 'testFood2', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', newPrice: 777, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Item not found. Cannot modify.")
          done();
        });
    });

    it('should not modify item with three prices', (done) => {
      const payload = {curName: 'testFood5', curItemCat: 'lunch/Dinner', newName: 'testFood2', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', newPrice: 777, price_large: 777, price_small: 666, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Price error")
          done();
        });
    });

    it('should not modify item with wrong price inputs', (done) => {
      const payload = {curName: 'testFood5', curItemCat: 'lunch/Dinner', newName: 'testFood2', newItemCat: 'lunch/Dinner', newPhoto: 'random2.png', newPrice: 777, price_small: 666, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/updateItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Price error")
          done();
        });
    });
  }) // end modifyItem 

  describe('apiDeleteItem', () => {
    it('should delete item from database', (done) => {
      const payload = {_id: addItem, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/deleteItem')
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Item deleted successfully")
          done();
        });
    });

    it('should delete item from database', (done) => {
      const payload = {_id: addItemTwo, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/deleteItem')
        .send(payload)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Item deleted successfully")
          done();
        });
    });

    it('should not delete item if token not found', (done) => {
      const payload = {_id: addItemTwo, username: "unit_test"}
      request(app)
        .post('/pizza/allItems/deleteItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("No Token")
          done();
        });
    });

    it('should not delete item if invalid token', (done) => {
      const payload = {_id: addItemTwo, username: "unit_test", token: "a;lsdkjhg;aslgjlk;sdsds"}
      request(app)
        .post('/pizza/allItems/deleteItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Invalid Token")
          done();
        });
    });

    it('should not delete item if username and token does not match', (done) => {
      const payload = {_id: addItemTwo, username: "Johnny", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/deleteItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Unauthorized User")
          done();
        });
    });

    it('should not delete item if item id not found', (done) => {
      const payload = {_id: 111111111111111111111111, username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/deleteItem')
        .send(payload)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.equal("Item not found")
          done();
        });
    });

    it('should return server error for invalid object id', (done) => {
      const payload = {_id: ";aoskdg;ajg;kl;oasdkjg", username: "unit_test", token: process.env.TESTING_TOKEN_OG}
      request(app)
        .post('/pizza/allItems/deleteItem')
        .send(payload)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Error deleting item")
          done();
        });
    });
  }) // end deleteItem 
  
  /*
  * TODO:
  * fix putItem and get tests up
  * create tests
  * unify database fields/schema
  */

}); // end itemController test block