import yargs from 'yargs';

class ParseArgumentsModule {
  constructor(conf) {
    this.conf = conf || (function () {});
  }

  execute(docs, ctx) {
    this.conf.call(null, yargs);
    ctx.argv = yargs.argv;
    return docs;
  }
}

export function args(confFn) {
  return new ParseArgumentsModule(confFn);
}