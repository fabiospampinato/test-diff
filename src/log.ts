
/* IMPORT */

import chalk from 'chalk';
import {CommandResult} from './types';

/* LOG */

const Log = {

  _parseMessage ( message: string ): string {

    return message.replace ( /(['"`])([^"]+?)\1/g, ( match, $1, $2 ) => `${$1}${chalk.underline ( $2 )}${$1}` ); // Automatically underlining things inside quotes

  },

  neutral ( message: string ): void {

    console.log ( message );

  },

  error ( message: string ): void {

    Log.neutral ( chalk.red ( Log._parseMessage ( message ) ) );

  },

  success ( message: string ): void {

    Log.neutral ( chalk.green ( Log._parseMessage ( message ) ) );

  },

  warning ( message: string ): void {

    Log.neutral ( chalk.yellow ( Log._parseMessage ( message ) ) );

  },

  block ( name: string, message: string, type: 'neutral' | 'error' | 'success' | 'warning' = 'neutral' ): void {

    const delimiterStart = `┌ ${name} ────────────────────`,
          delimiterEnd = `└${'─'.repeat ( delimiterStart.length - 1 )}`,
          output = `  ${message.split ( '\n' ).join ( '\n  ' )}`;

    Log[type] ( delimiterStart );
    Log.neutral ( output );
    Log[type] ( delimiterEnd );

  },

  result ( name: string, result: CommandResult, verbose: boolean = false ): void {

    if ( result.stdout && verbose ) {

      Log.block ( `${name}:stdout`, result.stdout, 'warning' );

    }

    if ( result.stderr ) {

      Log.block ( `${name}:stderr`, result.stderr, 'error' );

    }

  },

  test: {

    error ( name: string ): void {

      Log.error ( `✖ ${name}` );

    },

    success ( name: string ): void {

      Log.success ( `✔ ${name}` );

    }

  }

};

/* EXPORT */

export default Log;
