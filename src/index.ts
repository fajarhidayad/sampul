import { Hono } from 'hono';
import { logger } from 'hono/logger';
import routes, { notFound } from './routes';

const PORT = Bun.env.PORT;

const app = new Hono();
app.use(logger());

app.route('/', routes);
app.notFound(notFound);

export default {
  port: PORT,
  fetch: app.fetch,
};
