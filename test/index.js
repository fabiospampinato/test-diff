
/* IMPORT */

import {describe} from 'ava-spec';
import * as fs from 'fs-extra';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import diff from '../dist';

/* DIFF */

describe ( 'Diff', it => {

  it ( 'supports files', async t => {

    const SOURCE = path.join ( __dirname, 'files', 'source' ),
          OUTPUT = path.join ( __dirname, 'files', 'output' ),
          CHECK = path.join ( __dirname, 'files', 'check' );

    await diff ({
      silent: true,
      source: {
        cwd: SOURCE,
        glob: '*'
      },
      output: {
        cwd: OUTPUT,
        make ( source ) {
          const content = fs.readFileSync ( path.join ( SOURCE, source ), { encoding: 'utf-8' } );
          const number = parseInt ( content );
          const output = `${number * number }\n`;
          mkdirp.sync ( OUTPUT );
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

    const SOURCE = path.join ( __dirname, 'folders', 'source' ),
          OUTPUT = path.join ( __dirname, 'folders', 'output' ),
          CHECK = path.join ( __dirname, 'folders', 'check' );

    await diff ({
      silent: true,
      source: {
        cwd: SOURCE,
        glob: '*'
      },
      output: {
        cwd: OUTPUT,
        make ( source ) {
          mkdirp.sync ( OUTPUT );
          fs.copySync ( path.join ( CHECK, source ), path.join ( OUTPUT, source ) );
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

    const SOURCE = path.join ( __dirname, 'folders', 'source' ),
          OUTPUT = path.join ( __dirname, 'folders', 'output' ),
          CHECK = path.join ( __dirname, 'folders', 'check' );

    await diff ({
      silent: true,
      source: {
        cwd: SOURCE,
        glob: '**/*.*'
      },
      output: {
        cwd: OUTPUT,
        make ( source ) {
          mkdirp.sync ( OUTPUT );
          fs.copySync ( path.join ( CHECK, source ), path.join ( OUTPUT, source ) );
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
