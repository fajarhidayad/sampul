import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

import AuthLayout from './layouts/auth.layout';
import ExpensePage from './pages/expense';
import DashboardPage from './pages/dashboard';
import HistoryPage from './pages/history';
import SettingsPage from './pages/settings';
import { getSignedCookie } from 'hono/cookie';
import env from '../env';
import { verify } from 'hono/jwt';

const app = new Hono();
app.use(
  jsxRenderer(({ children, Layout }, c) => {
    const path = c.req.path;

    return (
      <Layout>
        <AuthLayout path={path}>{children}</AuthLayout>
      </Layout>
    );
  })
);

app.use('/*', async (c, next) => {
  const token = await getSignedCookie(c, env.COOKIE_SECRET, 'token');
  if (token) {
    const verifyToken = await verify(token, env.JWT_SECRET);
    if (verifyToken) {
      return next();
    }
  }
  c.status(401);
  c.header('HX-Redirect', '/account/login');
  // return c.redirect('/account/login');
  return c.text('');
});

app.get('/', (c) => {
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
