describe('marionettist responders', function() {
  'use strict';
  beforeEach(function() {
    var ResponderClass = Marionettist.Entities.Responders.Base.extend({});
    var view = new Marionettist.Views.Base();
    var region = new Marionettist.Region({el: "#app-test-region"});
    var responder = new ResponderClass({region: region});
    this.view = view;
    this.responder = responder;
  });

  it('should call the error fetch option callback', function(done) {
    var errorCallback = sinon.stub();
    var deferred = this.responder.deferred();
    var promise = null;
    var options = {
      fetch: {
        error: function(){
          errorCallback()
          expect(errorCallback).to.have.been.called;
          done()
        }
      },
      async: true
    };
    deferred.reject()
    promise = deferred.promise();
    this.responder.set("async", [promise]);
    this.responder.show(this.view,options);
  });



});
