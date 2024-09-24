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
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import ProfileForm from './components/profile-form';

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

app.get('/settings', async (c) => {
  const { sub } = c.get('jwtPayload');
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, sub))
    .limit(1);
  return c.render(
    <SettingsPage
      email={user[0].email}
      firstName={user[0].firstName}
      lastName={user[0].lastName}
    />
  );
});

const profileSchema = z.object({
  firstName: z
    .string()
    .min(3, 'Minimal 3 karakter')
    .max(50, 'maksimal 50 karakter'),
  lastName: z
    .string()
    .min(3, 'Minimal 3 karakter')
    .max(50, 'maksimal 50 karakter'),
  email: z.string().email('Gunakan email yang valid'),
});

app.put(
  '/settings/profile',
  zValidator('form', profileSchema, (result, c) => {
    if (!result.success) {
      const { data } = result;
      return c.html(
        <ProfileForm
          form={data}
          formErrors={result.error.formErrors.fieldErrors}
        />
      );
    }
  }),
  async (c) => {
    const formData = c.req.valid('form');
    const payload = c.get('jwtPayload');
    const checkEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, formData.email))
      .limit(1);
    if (checkEmail.length > 0 && checkEmail[0].email !== payload.sub) {
      return c.html(
        <ProfileForm errorMessage="Email telah terpakai" form={formData} />
      );
    }

    await db
      .update(users)
      .set({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })
      .where(eq(users.email, formData.email))
      .run();

    return c.html(
      <ProfileForm form={formData} successMessage="Behasil update profile" />
    );
  }
);

export default app;
