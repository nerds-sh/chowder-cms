/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';
import { lists } from './lists.js'


// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session, isAdmin } from './auth';

// const isAdmin = ({ authentication: { item: user}}) => {
//   return !!user && !!user.isAdmin
// }

// const isLoggedIn = ({ authentication: { item: user }}) => {
//   return !!user
// }

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    server: {
      port: 5003,
      cors: true
    },
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session,
    },
    lists,
    session,
  })
);
