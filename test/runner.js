require("./unit/setup/node.js")
var specs;


specs = require('require-all')({
  dirname: __dirname + '/unit',
  filter  :  /(.+spec)\.js$/
});
