import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

import AuthLayout from '../layouts/auth-layout';
import ExpensePage from '../pages/expense';
import DashboardPage from '../pages/dashboard';
import HistoryPage from '../pages/history';

const app = new Hono();
app.use(
  jsxRenderer(({ children, Layout }) => {
    return (
      <Layout>
        <AuthLayout>{children}</AuthLayout>
      </Layout>
    );
  })
);
app.get('/', (c) => {
  return c.render(<DashboardPage />);
});
app.get('/expense', (c) => {
  return c.render(<ExpensePage />);
});

app.get('/history', (c) => {
  return c.render(<HistoryPage />);
});

export default app;
