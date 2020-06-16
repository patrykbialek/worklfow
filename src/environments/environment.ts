// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import { dbConfig } from 'projects/db-config';

const firebase = {
  apiKey: "AIzaSyDtH67d63tGv01U_vlw4t6bnVs_yeQ7600",
  authDomain: "workflow-dd082.firebaseapp.com",
  databaseURL: "https://workflow-dd082.firebaseio.com",
  projectId: "workflow-dd082",
  storageBucket: "workflow-dd082.appspot.com",
  messagingSenderId: "881361990953",
  appId: "1:881361990953:web:545bc9608b498e6bcc3338"
};

export const environment = {
  development: true,
  production: false,
  // dbConfig,
  firebase,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
