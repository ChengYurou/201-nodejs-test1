const refreshMongo = require('./tool/mongoTool');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/supermarket', (err) => {
  if (err) {
    console.log('connect error');
  } else {
    console.log('connect success');
    refreshMongo(()=> {
      process.exit(0);
    })
  }
});