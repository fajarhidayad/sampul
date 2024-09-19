import { Hono } from 'hono';

import GuestLayout from './layouts/guest.layout';

import AboutPage from './pages/about';
import HomePage from './pages/home';
import BantuanPage from './pages/bantuan';
import { getSignedCookie } from 'hono/cookie';
import env from '@/env';

const app = new Hono();

app.get('/', async (c) => {
  const path = c.req.path;
  const loggedIn = (await getSignedCookie(c, env.COOKIE_SECRET, 'token'))
    ? true
    : false;
  return c.render(
    <GuestLayout location={path} loggedIn={loggedIn}>
      <HomePage />
    </GuestLayout>
  );
});

app.get('/tentang', async (c) => {
  const path = c.req.path;
  const loggedIn = (await getSignedCookie(c, env.COOKIE_SECRET, 'token'))
    ? true
    : false;
  return c.render(
    <GuestLayout location={path} loggedIn={loggedIn}>
      <AboutPage />
    </GuestLayout>
  );
});

app.get('/bantuan', async (c) => {
  const path = c.req.path;
  const loggedIn = (await getSignedCookie(c, env.COOKIE_SECRET, 'token'))
    ? true
    : false;
  return c.render(
    <GuestLayout location={path} loggedIn={loggedIn}>
      <BantuanPage />
    </GuestLayout>
  );
});

export default app;
