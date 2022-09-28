import { config } from '@keystone-6/core';
import { lists } from './lists.js'

import dotenv from 'dotenv'

import { insertSeedData } from "./seed-data";
import { session, withAuth } from "./auth";

dotenv.config();

const {
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  S3_REGION: region = 'ap-southeast-2',
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
  ASSET_BASE_URL: baseUrl = 'http://localhost:5003',
 } = process.env;


export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      async onConnect(context)  {
          await insertSeedData(context);
      }
    },
    storage: {
      my_local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: path => `${baseUrl}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      }
    },
    server: {
      port: 5001,
      cors: true
    },
    ui: {
      isAccessAllowed: (context) => !!context.session,
    },
    lists,
    session,
  })
);
