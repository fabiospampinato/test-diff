
/* IMPORT */

import path from 'node:path';

/* MAIN */

const isPathInside = ( parent: string, child: string ): boolean => {

  const relative = path.relative ( parent, child );

  return !!relative && !relative.startsWith ( '..' ) && !path.isAbsolute ( relative );

};

/* EXPORT */

export {isPathInside};
