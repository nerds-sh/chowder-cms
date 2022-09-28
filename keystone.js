import { config } from '@keystone-6/core';
import { lists } from './lists.js'

import { insertSeedData } from "./seed-data";
import { session, withAuth } from "./auth";

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      async onConnect(context)  {
          await insertSeedData(context);
      }
    },
    server: {
      port: 5003,
      cors: true
    },
    ui: {
      isAccessAllowed: (context) => !!context.session,
    },
    lists,
    session,
  })
);
