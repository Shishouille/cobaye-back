import express from 'express';
import bodyParser from 'body-parser';

import { corsMiddleware, headersMiddleware } from './middlewares/http-policies.js';
import errorsMiddleware from './middlewares/errors.js';
import routes from './routes/index.js';

const app = express();

// Prefer to define middlewares in separate files for cleaner code
app.use(bodyParser.json()); // application/json
app.use(corsMiddleware()); // application/json
app.use(headersMiddleware);

// Routes
routes.forEach(({ prefix, routes }) => {
  app.use(prefix, routes);
})

app.use(errorsMiddleware);

// It's cleaner to separate app logic to server logic
export default app;
