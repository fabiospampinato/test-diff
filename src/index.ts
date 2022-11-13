
/* IMPORT */

import fs from 'node:fs';
import path from 'node:path';
import exit from './exit';
import Glob from './glob';
import Log from './log';
import Spawn from './spawn';
import {isPathInside} from './utils';
import type {Options} from './types';

/* MAIN */

const diff = async ( options: Options ): Promise<void> => {

  /* UNCAUGHT EXCEPTIONS/REJECTIONS */

  process.on ( 'uncaughtException', exit );
  process.on ( 'unhandledRejection', exit );

  /* INIT */

  if ( isPathInside ( process.cwd (), options.output.cwd ) ) {

    if ( fs.existsSync ( options.output.cwd ) ) {

      fs.rmSync ( options.output.cwd, { recursive: true } );

    }

  }

  /* SOURCE */

  const sources = await Glob.exec ( options.source.glob, options.source.cwd );

  if ( !sources.length ) {

    if ( !options.silent ) {

      exit ( 'No sources found, are the "source.cwd" and "source.glob" options correct?' );

    } else {

      exit ();

    }

  }

  /* OUTPUT */

  for ( const source of sources ) {

    const result = await options.output.make ( source );

    /* CHECK RESULT */

    if ( result ) {

      if ( !options.silent ) {

        Log.result ( source, result, options.verbose );

      }

      if ( result.stderr ) {

        exit ();

      }

    }

  }

  /* CHECK OUTPUT */

  const checks = await Glob.exec ( options.check.glob, options.check.cwd );

  if ( !checks.length ) {

    if ( !options.silent ) {

      exit ( 'No checks found, are the "check.cwd" and "check.glob" options correct?' );

    } else {

      exit ();

    }

  }

  for ( const check of checks ) {

    const outputPath = path.join ( options.output.cwd, check );
    const checkPath = path.join ( options.check.cwd, check );

    if ( !fs.existsSync ( outputPath ) ) { // Ensuring there's an output to compare against

      fs.mkdirSync ( outputPath, { recursive: true } );

    }

    const result = Spawn.exec ( 'git', ['diff', '--no-index', '--color', outputPath, checkPath] );

    if ( !options.silent ) {

      Log.result ( `${check}:diff`, result, true );

    }

    if ( result.stdout || result.stderr ) {

      if ( !options.silent ) {

        Log.test.error ( check );

      }

      exit ();

    } else {

      if ( !options.silent ) {

        Log.test.success ( check );

      }

    }

  }

};

/* EXPORT */

export default diff;
