describe('marionettist module', function() {
  'use strict';

  beforeEach(function() {


    this.onTestEvent = sinon.stub();

    this.CustomModule = Marionettist.Module.extend({
      onTestEvent: this.onTestEvent
    });

    this.customModule = new this.CustomModule

    this.customModule.reply("data", function(){
      return true
    })

    this.customModule.triggerMethod("test:event", {})


  });

  it('should run the customModule onTestEvent callback', function() {
    expect(this.customModule.onTestEvent).to.have.been.called;
  });

  it('should request data and return an true', function() {
    expect(this.customModule.request("data")).to.be.true;
  });



});
