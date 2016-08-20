var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiJq = require('chai-jq');

chai.use(sinonChai);
chai.use(chaiJq);

global.expect = chai.expect;
global.sinon = sinon;

if (!global.document || !global.window) {

  var jsdom = require("jsdom");

  jsdom.env({
    url: "http://localhost/",
    // html: "",
    scripts: [],
    done: function (err, window) {
      var $ = window.$;
    }
  });
}

global.$ = global.jQuery = require('jquery');
global._ = require('underscore');
global.Backbone = require('backbone');
// global.Marionettist = require('backbone')
global.slice = Array.prototype.slice;
