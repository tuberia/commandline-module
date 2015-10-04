import * as ask from './ask';

function neuter(txt) {
  return txt.toLowerCase()
    .replace(/[\W]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s+|\s+$/g, '')
    .replace(/[\s]+(.)/g, function (match, $1) {
      return $1.toUpperCase();
    });
}

class ConsolePromptModule {
  constructor(fn, label) {
    ask.start();
    this.askFn = fn;
    this.label = label;
    this.keyName = void 0;
  }

  key(keyName) {
    this.keyName = keyName;
    return this;
  }

  execute(docs, ctx) {
    if (!this.keyName) {
      this.keyName = neuter(this.label) || 'asked';
    }
    return this.askFn(this.label).then(res => {
      return docs.map(d => {
        d.meta[this.keyName] = res;
      });
    });
  }
}

export function string(label) {
  return new ConsolePromptModule(ask.forString, label);
}

export function password(label) {
  return new ConsolePromptModule(ask.forPassword, label);
}

export function yesNo(label) {
  return new ConsolePromptModule(ask.question, label);
}