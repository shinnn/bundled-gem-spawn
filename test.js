'use strict';

const {EOL} = require('os');

const bundledGemSpawn = require('.');
const concatStream = require('concat-stream');
const test = require('tape');

test('bundledGemSpawn()', t => {
  t.plan(9);

  t.strictEqual(bundledGemSpawn.name, 'bundledGemSpawn', 'should have a function name.');

  const originalPATH = process.env.PATH;
  process.env.PATH = 'node_modules';

  bundledGemSpawn('travis')
  .on('error', err => {
    t.equal(err.code, 'ENOENT', 'should fail when it cannot run `bundle` command.');

    process.env.PATH = originalPATH;

    bundledGemSpawn('travis')
    .on('error', t.fail)
    .stdout.setEncoding('utf8').pipe(concatStream({encoding: 'string'}, output => {
      t.ok(output.includes('Available commands:'), 'should spawn a bundled gem.');
    }));

    bundledGemSpawn('travis', ['foobarbaz'])
    .on('error', t.fail)
    .stderr.setEncoding('utf8').pipe(concatStream({encoding: 'string'}, output => {
      t.equal(output, `unknown command foobarbaz${EOL}`, 'should spawn a bundled gem with additional arguments.');
    }));

    bundledGemSpawn('foobarbazqux0123456789')
    .on('error', t.fail)
    // https://github.com/bundler/bundler/issues/4055
    .stdout.setEncoding('utf8').pipe(concatStream({encoding: 'string'}, output => {
      t.equal(output, [
        'bundler: command not found: foobarbazqux0123456789',
        'Install missing gem executables with `bundle install`',
        ''
      ].join(EOL), 'should emit `bundle exec` errors.');
    }));
  })
  .on('exit', t.fail.bind(null, '`bundle exec travis` command was unexpectedly launched.'));

  t.throws(
    () => bundledGemSpawn('travis', {stdio: 123}),
    /TypeError.*stdio/,
    'should pass the option object to childProcess#spawn.'
  );

  t.throws(
    () => bundledGemSpawn(123),
    /TypeError.*123 is not a string\. Expected a Ruby gem name\./,
    'should throw a type error when the first argument is not a string.'
  );

  t.throws(
    () => bundledGemSpawn('', null),
    /Expected a Ruby gem name but received an empty string\./,
    'should throw a type error when the first argument is an empty string.'
  );

  t.throws(
    () => bundledGemSpawn('travis', null, {}),
    /TypeError.* is not an array\. Expected a list of arguments to be passed to `bundle exec travis` command\./,
    'should throw a type error when it takes three arguments but the second is not an array.'
  );
});
