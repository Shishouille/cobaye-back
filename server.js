import connect from './config/database.js';
import env from './config/env.js';
import app from './app.js';

// Use IIFE to use async await
(async () => {
  await connect(env.get('mongo'));
  app.listen(env.get('port'));
})();
