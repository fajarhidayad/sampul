import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

import GuestLayout from '../layouts/guest-layout';

import HomePage from '../pages/home';
import AboutPage from '../pages/about';
import SignInPage from '../pages/sign-in';
import RegisterPage from '../pages/register';

const app = new Hono();
app.use(
  jsxRenderer(({ children, Layout }) => {
    return (
      <Layout>
        <GuestLayout>{children}</GuestLayout>
      </Layout>
    );
  })
);

app.get('/', (c) => {
  return c.render(<HomePage />);
});

app.get('/about', (c) => {
  return c.render(<AboutPage />);
});

app.get('/sign-in', (c) => {
  return c.render(<SignInPage />);
});

app.get('/register', (c) => {
  return c.render(<RegisterPage />);
});

export default app;
