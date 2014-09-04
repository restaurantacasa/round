'use strict';

describe('Directive: firstLastName', function () {

  // load the directive's module
  beforeEach(module('roundApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<first-last-name></first-last-name>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the firstLastName directive');
  }));
});
