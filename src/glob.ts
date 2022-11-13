
/* IMPORT */

import path from 'node:path';
import picomatch from 'picomatch';
import readdir from 'tiny-readdir';

/* MAIN */

const Glob = {

  /* API */

  exec: async ( glob: string | string[], cwd: string ): Promise<string[]> => {

    const isMatch = picomatch ( glob );
    const {files} = await readdir ( cwd );
    const filesRelative = files.map ( file => path.relative ( cwd, file ) );
    const filesMatching = filesRelative.filter ( file => isMatch ( file ) );

    return filesMatching;

  }

};

/* EXPORT */

export default Glob;
