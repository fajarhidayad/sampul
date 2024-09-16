import { Context, Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { jsxRenderer } from 'hono/jsx-renderer';
import { BlankEnv } from 'hono/types';

import BaseLayout from '../layouts/base-layout';
import authRoute from './auths';
import guestRoute from './guests';
import accountsRoute from './accounts';

import NotFoundPage from '../pages/not-found';
import { jwt, JwtVariables } from 'hono/jwt';
import env from '../env';

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

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
app.get('/static/favicon.ico', serveStatic({ path: 'public/wallet.png' }));

app.route('/', guestRoute);

app.route('/account', accountsRoute);
app.route('/dashboard', authRoute);

export const notFound = (c: Context<BlankEnv>) => {
  c.status(404);
  return c.render(<NotFoundPage />);
};

export default app;
