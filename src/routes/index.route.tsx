import { Context, Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { jsxRenderer } from 'hono/jsx-renderer';
import { BlankEnv } from 'hono/types';

import BaseLayout from '../layouts/base-layout';
import authRoute from './auth-page.route';
import guestRoute from './guest-page.route';

import NotFoundPage from '../pages/not-found';

const app = new Hono();

app.use(
  jsxRenderer(({ children }) => <BaseLayout>{children}</BaseLayout>, {
    docType: true,
  })
);
app.use('/static/*', serveStatic({ root: 'public' }));
app.get(
  '/static/global.css',
  serveStatic({ path: 'public/styles/global.css' })
);

app.route('/dashboard', authRoute);
app.route('/', guestRoute);

export const notFound = (c: Context<BlankEnv>) => {
  c.status(404);
  return c.render(<NotFoundPage />);
};

export default app;
