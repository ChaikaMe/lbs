import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export function setupServer() {
  const server = express();
  server.use(cors());
  server.use(express.json());

  server.set('json spaces', 2);

  server.use(router);
  server.use('*', notFoundHandler);
  server.use(errorHandler);

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
