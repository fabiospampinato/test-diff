
/* TYPES */

type CommandResult = {
  stdout?: string,
  stderr?: string
};

type Options = {
  silent?: boolean,
  verbose?: boolean,
  source: {
    cwd: string,
    glob: string | string[]
  },
  output: {
    cwd: string,
    make: ( source: string ) => void | CommandResult | Promise<void> | Promise<CommandResult>
  },
  check: {
    cwd: string
    glob: string | string[]
  }
};

/* EXPORT */

export {CommandResult, Options};
