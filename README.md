# bundled-gem-spawn

[![NPM version](https://img.shields.io/npm/v/bundled-gem-spawn.svg)](https://www.npmjs.com/package/bundled-gem-spawn)
[![Build Status](https://travis-ci.org/shinnn/bundled-gem-spawn.svg?branch=master)](https://travis-ci.org/shinnn/bundled-gem-spawn)
[![Build status](https://ci.appveyor.com/api/projects/status/ssshinoo2e3fyryv/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/bundled-gem-spawn/branch/master)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/bundled-gem-spawn.svg)](https://coveralls.io/github/shinnn/bundled-gem-spawn?branch=master)
[![Dependency Status](https://img.shields.io/david/shinnn/bundled-gem-spawn.svg?label=deps)](https://david-dm.org/shinnn/bundled-gem-spawn)
[![devDependency Status](https://img.shields.io/david/dev/shinnn/bundled-gem-spawn.svg?label=devDeps)](https://david-dm.org/shinnn/bundled-gem-spawn#info=devDependencies)

A [Node](https://nodejs.org/) module to launch a [new process](https://nodejs.org/api/child_process.html) with the given command in a [`bundle exec`](http://bundler.io/man/bundle-exec.1.html) context

```javascript
const bundledGemSpawn = require('bundled-gem-spawn');

bundledGemSpawn('sass', ['--version'])
.stdout.pipe(process.stdout); //=> 'Sass 3.4.19 (Selective Steve)'
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install bundled-gem-spawn
```

Also make sure [Bundler](http://bundler.io/) is [installed](http://bundler.io/#getting-started).

## API

```javascript
const bundledGemSpawn = require('bundled-gem-spawn');
```

### bundledGemSpawn(*cmd* [, *args*, *options*])

*cmd*: `String` (the command to run)  
*args*: `Array` (additional arguments passed to the command)  
*options*: `Object` (directly passed to [`child_process#spawn`][spawn])  
Return: [`ChildProcess`](https://nodejs.org/api/child_process.html#child_process_class_childprocess) instance

It has exactly the same API as [`child_process#spawn`][spawn]'s. The only difference is that *bundled-gem-spawn* runs the command in a [`bundle exec`][bundle-exec] context.

```javascript
const bundledGemSpawn = require('bundled-gem-spawn');
bundledGemSpawn('rails', ['c'])

// --- is almost the same script as ---

const {spawn} = require('child_process');
spawn('bundle', ['exec', 'rails', 'c'])
```

## Testing

Requires [Git](https://git-scm.com/), [Node](https://nodejs.org/) v4+ and [Docker machine](https://docs.docker.com/machine/).

1. [Clone](https://git-scm.com/docs/git-clone) this repository and [change CWD](http://pubs.opengroup.org/onlinepubs/9699919799/utilities/cd.html) to the cloned `bundled-gem-spawn` directory.
2. Run [`npm install`](https://docs.npmjs.com/cli/install#synopsis).
3. [Create and run a container](https://docs.docker.com/machine/get-started/) with no additional settings.
4. Run [`npm test`](https://docs.npmjs.com/cli/test).

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

[spawn]: https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
[bundle-exec]: http://bundler.io/man/bundle-exec.1.html
