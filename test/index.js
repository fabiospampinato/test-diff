
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import path from 'node:path';
import diff from '../dist/index.js';

/* MAIN */

describe ( 'Diff', it => {

  it ( 'supports files', async t => {

    const SOURCE = path.join ( process.cwd (), 'test', 'files', 'source' );
    const OUTPUT = path.join ( process.cwd (), 'test', 'files', 'output' );
    const CHECK = path.join ( process.cwd (), 'test', 'files', 'check' );

    await diff ({
      silent: true,
      source: {
        cwd: SOURCE,
        glob: '*'
      },
      output: {
        cwd: OUTPUT,
        make ( source ) {
          const content = fs.readFileSync ( path.join ( SOURCE, source ), 'utf8' );
          const number = parseInt ( content );
          const output = `${number * number }\n`;
          fs.mkdirSync ( OUTPUT, { recursive: true } );
          fs.writeFileSync ( path.join ( OUTPUT, source ), output );
        }
      },
      check: {
        cwd: CHECK,
        glob: '*'
      }
    });

    t.pass ();

  });

  it ( 'supports folders', async t => {

    const SOURCE = path.join ( process.cwd (), 'test', 'folders', 'source' );
    const OUTPUT = path.join ( process.cwd (), 'test', 'folders', 'output' );
    const CHECK = path.join ( process.cwd (), 'test', 'folders', 'check' );

    await diff ({
      silent: true,
      source: {
        cwd: SOURCE,
        glob: '*'
      },
      output: {
        cwd: OUTPUT,
        make ( source ) {
          fs.mkdirSync ( OUTPUT, { recursive: true } );
          fs.cpSync ( path.join ( CHECK, source ), path.join ( OUTPUT, source ), { recursive: true } );
        }
      },
      check: {
        cwd: CHECK,
        glob: '*'
      }
    });

    t.pass ();

  });

  it ( 'supports nested files', async t => {

    const SOURCE = path.join ( process.cwd (), 'test', 'folders', 'source' );
    const OUTPUT = path.join ( process.cwd (), 'test', 'folders', 'output' );
    const CHECK = path.join ( process.cwd (), 'test', 'folders', 'check' );

    await diff ({
      silent: true,
      source: {
        cwd: SOURCE,
        glob: '**/*.*'
      },
      output: {
        cwd: OUTPUT,
        make ( source ) {
          fs.mkdirSync ( OUTPUT, { recursive: true } );
          fs.cpSync ( path.join ( CHECK, source ), path.join ( OUTPUT, source ), { recursive: true } );
        }
      },
      check: {
        cwd: CHECK,
        glob: '**/*.*'
      }
    });

    t.pass ();

  });

});
