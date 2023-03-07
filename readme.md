# Test Diff

Library for writing tests that diff the excepted output with the actual output.

## Install

```sh
npm install --save test-diff
```

## Usage

A directory structure similar to the following is expected:

```
.
├── source    # Directory containing the source files/folders
├── output    # Directory containing the actual output of processing the source files/folders
└── check     # Directory containing the expected output
```

Basically this library will find some files/folders to process, it'll pass them to the `output.make` function which will do something with them and write its output in the `output` directory, finally this library will check if the `check` and `output` folders match.

```ts
import diff from 'test-diff';

diff ({
  source: {
    cwd: path.join ( __dirname, 'source' ), // Path containing the files/folders to parse
    glob: '**' // Glob used to find individual files/folders to parse
  },
  output: {
    cwd: path.join ( __dirname, 'output' ), // Path containing the actual output
    make ( source ) { // Function that generates the output given a relative source file/folder
      // ...
      fs.writeFileSync ( path.join ( OUTPUT, source ), 'your actual output for this file/folder...' );
      // ...
    }
  },
  check: {
    cwd: path.join ( __dirname, 'check' ), // Path containing the expected output
    glob: '**' // Glob used to find individual tests to perform
  }
});
```

The actual `diff` is performed via `git`, so you'll have to have it installed in your system.

You can find more examples [here](./test).

## License

MIT © Fabio Spampinato
