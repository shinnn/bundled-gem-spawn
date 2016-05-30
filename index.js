'use strict';

var crossSpawn = require('cross-spawn');

module.exports = function bundledGemSpawn(gemName, args, options) {
  if (typeof gemName !== 'string') {
    throw new TypeError(
      String(gemName) +
      ' is not a string. Expected a Ruby gem name.'
    );
  }

  if (gemName === '') {
    throw new Error('Expected a Ruby gem name but received an empty string.');
  }

  if (!Array.isArray(args)) {
    if (!options) {
      options = args;
      args = [];
    } else {
      throw new TypeError(
        String(args) +
        ' is not an array. Expected a list of arguments to be passed to `bundle exec ' + gemName + '` command.'
      );
    }
  }

  return crossSpawn('bundle', ['exec', gemName].concat(args), options);
};
