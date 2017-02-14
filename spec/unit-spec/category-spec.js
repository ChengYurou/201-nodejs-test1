require('should');
const request = require('supertest');
const app = require('../../app');
const constant = require('../../config/constant');

describe('CategoryController', () => {
  it('GET /categories should return all categories', (done)=> {
    request(app)
        .get('/categories')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.totalCount.should.eql(1);
        })
        .end(done)
  });

  it('GET /categories should return one category', (done)=> {
    request(app)
        .get('/categories/587f0f2586653d19297d40c8')
        .expect(constant.httpCode.OK)
        .expect((res) => {
          res.body.should.eql({
            "_id": "587f0f2586653d19297d40c8",
            "name": "文具",
            "__v": 0
          })
        })
        .end(done)
  })

  it('POST /categories should return category uri', (done)=> {
    const category = {
      name: 'test category',
    };
    request(app)
        .post('/categories')
        .send(category)
        .expect(constant.httpCode.CREATED)
        .expect((res) => {
          const result = /^categories\/(.*)$/.test(res.body.uri);
          result.should.eql(true);
        })
        .end(done)
  })

  it('DELETE /categories should delete category', (done)=> {
    request(app)
        .delete('/categories/587f0f2586653d19297d40c8')
        .expect(constant.httpCode.BAD_REQUEST)
        .end(done)
  })

  it('PUT /categories should update category', (done)=> {
    const category = {
      name: 'test category',
    };
    request(app)
        .put('/categories/587f0f2586653d19297d40c8')
        .send(category)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done)
  })

});