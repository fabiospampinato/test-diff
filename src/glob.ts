
/* IMPORT */

import * as globby from 'globby';

/* GLOB */

const Glob = {

  exec ( glob: string | string[], cwd: string ): Promise<string[]> {

    return globby ( glob, {
      cwd,
      onlyDirectories: false,
      onlyFiles: false
    });

  }

};

/* EXPORT */

export default Glob;
