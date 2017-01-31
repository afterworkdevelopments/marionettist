var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiJq = require('chai-jq');

chai.use(sinonChai);
chai.use(chaiJq);

global.expect = chai.expect;
global.sinon = sinon;

if (!global.document || !global.window) {
  var jsdom = require('jsdom').jsdom;

  global.document = jsdom('<html><head><script></script></head><body><div id="app-test-region"></div></body></html>', {
    FetchExternalResources: ['script'],
    ProcessExternalResources: ['script']
  });

  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}

global.$ = global.jQuery = require('jquery');
global._ = require('underscore');
global.Backbone = require('backbone');
global.Marionettist = require('../../../dist/marionettist.js')
global.slice = Array.prototype.slice;
