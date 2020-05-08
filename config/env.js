import nconf from 'nconf';

// Will fetch env variables from argv, then env, then specified file, here config.json
nconf
  .argv()
  .env()
  .file('config.json');

export default nconf;
