
/* IMPORT */

import path from 'node:path';
import readdir from 'tiny-readdir';
import zeptomatch from 'zeptomatch';

/* MAIN */

const Glob = {

  /* API */

  exec: async ( glob: string | string[], cwd: string ): Promise<string[]> => {

    const {files} = await readdir ( cwd );
    const filesRelative = files.map ( file => path.relative ( cwd, file ) );
    const filesMatching = filesRelative.filter ( file => zeptomatch ( glob, file ) );

    return filesMatching;

  }

};

/* EXPORT */

export default Glob;
