import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

import { deleteCookie, getSignedCookie } from 'hono/cookie';
import { jwt, verify } from 'hono/jwt';
import env from '../env';
import AuthLayout from './layouts/auth.layout';
import DashboardPage from './pages/dashboard';
import ExpensePage from './pages/expense';
import HistoryPage from './pages/history';
import SettingsPage from './pages/settings';

const app = new Hono();

app.use('/*', async (c, next) => {
  const token = await getSignedCookie(c, env.COOKIE_SECRET, 'token');
  if (token) {
    try {
      await verify(token, env.JWT_SECRET);
      return next();
    } catch (error) {
      deleteCookie(c, 'token');
      c.status(401);
      c.header('HX-Redirect', '/account/login');
      return c.redirect('/account/login');
    }
  }
  c.status(401);
  c.header('HX-Redirect', '/account/login');
  return c.text('');
});

app.use(
  '/*',
  jwt({
    secret: env.JWT_SECRET,
    cookie: {
      key: 'token',
      secret: env.COOKIE_SECRET,
    },
  })
);

app.use(
  jsxRenderer(({ children, Layout }, c) => {
    const path = c.req.path;
    const fullName = c.get('jwtPayload');

    return (
      <Layout>
        <AuthLayout path={path} fullName={fullName.name}>
          {children}
        </AuthLayout>
      </Layout>
    );
  })
);

app.get('/', async (c) => {
  return c.render(<DashboardPage />);
});
app.get('/expense', (c) => {
  return c.render(<ExpensePage />);
});

app.get('/history', (c) => {
  return c.render(<HistoryPage />);
});

app.get('/settings', (c) => {
  return c.render(<SettingsPage />);
});

export default app;
