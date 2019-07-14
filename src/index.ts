
/* IMPORT */

import * as execa from 'execa';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as rimraf from 'rimraf';
import {Options} from './types';
import exit from './exit';
import Glob from './glob';
import Log from './log';

/* DIFF */

async function diff ( options: Options ): Promise<void> {

  /* INIT */

  rimraf.sync ( options.output.cwd );

  /* SOURCE */

  const sources = await Glob.exec ( options.source.glob, options.source.cwd );

  if ( !sources.length ) {

    if ( !options.silent ) exit ( `No sources found, are the "source.cwd" and "source.glob" options correct?` );

    exit ();

  }

  /* OUTPUT */

  for ( let source of sources ) {

    const result = await options.output.make ( source );

    /* CHECK RESULT */

    if ( result ) {

      if ( !options.silent ) Log.result ( source, result, options.verbose );

      if ( result.stderr ) exit ();

    }

  }

  /* CHECK OUTPUT */

  const checks = await Glob.exec ( options.check.glob, options.check.cwd );

  if ( !checks.length ) {

    if ( !options.silent ) exit ( `No checks found, are the "check.cwd" and "check.glob" options correct?` );

    exit ();

  }

  for ( let check of checks ) {

    const outputPath = path.join ( options.output.cwd, check ),
          checkPath = path.join ( options.check.cwd, check );

    if ( !fs.existsSync ( outputPath ) ) mkdirp.sync ( outputPath ); // Ensuring there's an output to compare against

    const result = await execa ( 'git', ['diff', '--no-index', '--color', outputPath, checkPath], { reject: false } );

    if ( !options.silent ) Log.result ( `${check}:diff`, result, true );

    if ( result.stdout || result.stderr ) {

      if ( !options.silent ) Log.test.error ( check );

      exit ();

    } else {

      if ( !options.silent ) Log.test.success ( check );

    }

  }

}

/* EXPORT */

export default diff;
