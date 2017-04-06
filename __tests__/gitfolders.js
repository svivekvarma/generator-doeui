'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-doeui:gitfolders', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/gitfolders'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
