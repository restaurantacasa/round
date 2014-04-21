'use strict';

describe('Service: roundSett', function () {

  // load the service's module
  beforeEach(module('roundApp'));

  // instantiate service
  var roundSett;
  beforeEach(inject(function (_roundSett_) {
    roundSett = _roundSett_;
  }));

  it('should do something', function () {
    expect(!!roundSett).toBe(true);
  });

});
