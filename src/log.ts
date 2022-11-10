
/* IMPORT */

import color from 'tiny-colors';
import type {CommandResult} from './types';

/* HELPERS */

const parseMessage = ( message: string ): string => {

  // Automatically underlining things between quotes

  return message.replace ( /(['"`])([^"]+?)\1/g, ( _, $1, $2 ) => {

    return `${$1}${color.underline ( $2 )}${$1}`;

  });

};

/* MAIN */

const Log = {

  /* TEST API */

  test: {

    error: ( name: string ): void => {

      Log.error ( `✖ ${name}` );

    },

    success: ( name: string ): void => {

      Log.success ( `✔ ${name}` );

    }

  },

  /* API */

  neutral: ( message: string ): void => {

    console.log ( message );

  },

  error: ( message: string ): void => {

    Log.neutral ( color.red ( parseMessage ( message ) ) );

  },

  success: ( message: string ): void => {

    Log.neutral ( color.green ( parseMessage ( message ) ) );

  },

  warning: ( message: string ): void => {

    Log.neutral ( color.yellow ( parseMessage ( message ) ) );

  },

  block: ( name: string, message: string, type: 'neutral' | 'error' | 'success' | 'warning' = 'neutral' ): void => {

    const delimiterStart = `┌ ${name} ────────────────────`;
    const delimiterEnd = `└${'─'.repeat ( delimiterStart.length - 1 )}`;
    const output = `  ${message.split ( '\n' ).join ( '\n  ' )}`;

    Log[type] ( delimiterStart );
    Log.neutral ( output );
    Log[type] ( delimiterEnd );

  },

  result: ( name: string, result: CommandResult, verbose: boolean = false ): void => {

    if ( result.stdout && verbose ) {

      Log.block ( `${name}:stdout`, result.stdout, 'warning' );

    }

    if ( result.stderr ) {

      Log.block ( `${name}:stderr`, result.stderr, 'error' );

    }

  }

};

/* EXPORT */

export default Log;
