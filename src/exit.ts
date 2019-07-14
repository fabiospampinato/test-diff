
/* IMPORT */

import Log from './log';

/* EXIT */

function exit ( message?: string ): void {

  if ( message ) Log.error ( message );

  process.exit ( 1 );

}

/* EXPORT */

export default exit;
