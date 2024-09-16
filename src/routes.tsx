import { Context, Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { jsxRenderer } from 'hono/jsx-renderer';
import { BlankEnv } from 'hono/types';

import authRoute from './auth/auths.routes';
import BaseLayout from './layouts/base-layout';
import accountsRoute from './account/accounts.routes';
import guestRoute from './guest/guests.routes';

import { JwtVariables } from 'hono/jwt';
import { html } from 'hono/html';

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

/**
 * Middlewares
 */
app.use(
  jsxRenderer(({ children }) => <BaseLayout>{children}</BaseLayout>, {
    docType: true,
  })
);
app.use('/static/*', serveStatic({ root: 'public' }));

/**
 * Serve static files
 */
app.get(
  '/static/global.css',
  serveStatic({ path: 'public/styles/global.css' })
);
app.get(
  '/static/styles.css',
  serveStatic({ path: 'public/styles/styles.css' })
);
app.get('/static/favicon.ico', serveStatic({ path: 'public/wallet.png' }));

/**
 * Group Routes
 */
app.route('/', guestRoute);
app.route('/account', accountsRoute);
app.route('/dashboard', authRoute);

export const notFound = (c: Context<BlankEnv>) => {
  c.status(404);
  return c.render(html`
    <div>
      <title>Not Found</title>
      <h1>404 Not Found</h1>
    </div>
  `);
};

export default app;
