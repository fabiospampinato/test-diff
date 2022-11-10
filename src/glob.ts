
/* IMPORT */

import path from 'node:path';
import picomatch from 'picomatch';
import readdir from 'tiny-readdir';

/* MAIN */

const Glob = {

  /* API */

  exec: async ( glob: string | string[], cwd: string ): Promise<string[]> => {

    const isMatch = picomatch ( glob, { cwd } );
    const {files} = await readdir ( cwd );
    const filesMatching = files.filter ( isMatch );
    const filesRelative = filesMatching.map ( file => path.relative ( cwd, file ) );

    return filesRelative;

  }

};

/* EXPORT */

export default Glob;
