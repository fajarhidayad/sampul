import { Hono } from 'hono';

import GuestLayout from './layouts/guest.layout';

import AboutPage from './pages/about';
import HomePage from './pages/home';

const app = new Hono();

app.get('/', (c) => {
  return c.render(
    <GuestLayout>
      <HomePage />
    </GuestLayout>
  );
});

app.get('/about', (c) => {
  return c.render(
    <GuestLayout>
      <AboutPage />
    </GuestLayout>
  );
});

export default app;
