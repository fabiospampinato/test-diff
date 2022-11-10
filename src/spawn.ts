
/* IMPORT */

import {spawnSync} from 'node:child_process';
import type {CommandResult} from './types';

/* MAIN */

const Spawn = {

  /* API */

  exec: ( command: string, args: string[] = [] ): CommandResult => {

    const process = spawnSync ( command, args );
    const stderr = process.stderr.toString ();
    const stdout = process.stdout.toString ();

    return {stderr, stdout};

  }

};

/* EXPORT */

export default Spawn;
