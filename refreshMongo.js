const refreshMongo = require('./tool/mongoTool');
const mongoose = require('mongoose');
const config = require('config')

mongoose.connect(config.get('mongoUri'), (err) => {
  if (err) {
    console.log('connect error');
  } else {
    console.log('connect success');
    refreshMongo(()=> {
      process.exit(0);
    })
  }
});