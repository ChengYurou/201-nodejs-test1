const Category = require('../model/category');
const Item = require('../model/item')
const async = require('async');
const constant = require('../config/constant');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      categories: (cb) => {
        Category.find({}, cb);
      },
      totalCount: (cb) => {
        Category.count(cb);
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
      (data, done) => {
        if (data) {
          return done(true, null);
        }
        Category.findByIdAndRemove(categoryId, done)

      }
    ], (err, doc) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
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