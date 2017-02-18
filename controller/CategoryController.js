const Category = require('../model/category');
const Item = require('../model/item')
const async = require('async');
const constant = require('../config/constant');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      categories: (done) => {
        Category.find({}, done);
      },
      totalCount: (done) => {
        Category.count(done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  };

  getOne(req, res, next) {
    Category.findById(req.params.categoryId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc);
    })
  }

  create(req, res, next) {
    Category.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `categories/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;
    async.waterfall([
      (done) => {
        Item.findOne({categoryId}, done)
      },
      (docs, done) => {
        if (docs) {
          let error = {status: constant.httpCode.BAD_REQUEST};
          return done(error, null);
        }
        Category.findByIdAndRemove(categoryId, done)
      }
    ], (err, doc) => {
      if (err && err.status) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err && !err.status) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });

  }

  update(req, res, next) {
    Category.findByIdAndUpdate(req.params.categoryId, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }
}

module.exports = CategoryController;