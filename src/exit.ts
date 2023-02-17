
/* IMPORT */

import process from 'node:process';
import Log from './log';

/* MAIN */

const exit = ( error?: Error | string ): never => {

  if ( error instanceof Error ) {

    Log.block ( 'Error', error.stack || error.message, 'error' );

  } else if ( error ) {

    Log.error ( error );

  }

  process.exit ( 1 );

};

/* EXPORT */

export default exit;
