const cart = require('./fixtrue/cart');
const category = require('./fixtrue/category');
const item = require('./fixtrue/item');

const Cart = require('../model/cart');
const Category = require('../model/category');
const Item = require('../model/item');

const modelMap = [Cart, Category, Item];
const data = {
  Cart: cart,
  Category: category,
  Item: item
};

module.exports = (done) => {
  let count = 0;
  modelMap.forEach(Model => {
    Model.remove({}, () => {
      Model.create(data[Model.modelName], ()=> {
        count++;
        if (count === Model.length) {
          console.log('refreshMongo success');
          done();
        }
      })
    })
  })
}