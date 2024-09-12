import { Hono } from 'hono';
import { logger } from 'hono/logger';
import apiRoute from './routes/api.route';
import pageRoute, { notFound } from './routes/index.route';

const PORT = Bun.env.PORT;

const app = new Hono();
app.use(logger());

app.route('/', pageRoute);
app.route('/api', apiRoute);
app.notFound(notFound);

export default {
  port: PORT,
  fetch: app.fetch,
};
