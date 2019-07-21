
/* IMPORT */

import Log from './log';

/* EXIT */

function exit ( err?: Error | string ): void {

  if ( err instanceof Error ) {

    Log.block ( 'Error', err.stack || err.message, 'error' );

  } else if ( err ) {

    Log.error ( err );

  }

  process.exit ( 1 );

}

/* EXPORT */

export default exit;
