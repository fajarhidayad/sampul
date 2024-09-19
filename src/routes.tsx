import { Context, Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { jsxRenderer } from 'hono/jsx-renderer';
import { BlankEnv } from 'hono/types';

import accountsRoute from './account/accounts.routes';
import authRoute from './auth/auths.routes';
import guestRoute from './guest/guests.routes';
import BaseLayout from './layouts/base.layout';

import { html } from 'hono/html';
import { JwtVariables } from 'hono/jwt';

type Variables = JwtVariables;

const app = new Hono<{ Variables: Variables }>();

/**
 * Middlewares
 */
app.use(
  jsxRenderer(({ children }, c) => <BaseLayout>{children}</BaseLayout>, {
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
    <main
      class="h-screen flex flex-col items-center justify-center space-y-5 text-center"
    >
      <title>Not Found</title>
      <h1 class="text-3xl font-semibold text-slate-700">
        404 Halaman Tidak Ditemukan
      </h1>
      <p class="text-slate-500 max-w-xl">
        Maaf karena membuat Anda tidak nyaman. Gunakan tombol dibawah untuk
        kembali ke halaman utama.
      </p>
      <a href="/" hx-boost="true" class="btn btn-primary">Kembali</a>
    </main>
  `);
};

export default app;
