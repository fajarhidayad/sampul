import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { deleteCookie, getSignedCookie, setSignedCookie } from 'hono/cookie';
import { jsxRenderer } from 'hono/jsx-renderer';
import { sign, verify } from 'hono/jwt';
import { z } from 'zod';
import { db } from '../db';
import { usersTable } from '../db/schema';
import env from '../env';
import AccountLayout from '../layouts/account-layout';
import RegisterPage from '../pages/register';
import SignInPage from '../pages/sign-in';
import argon from 'argon2';

const app = new Hono();

app.use(
  jsxRenderer(({ children, Layout }) => {
    return (
      <Layout>
        <AccountLayout>{children}</AccountLayout>
      </Layout>
    );
  })
);

app.use('/*', async (c, next) => {
  const token = await getSignedCookie(c, env.COOKIE_SECRET, 'token');
  if (token) {
    const verifyToken = await verify(token, env.JWT_SECRET);
    if (verifyToken) {
      if (
        c.req.path === '/account/register' ||
        c.req.path === '/account/login'
      ) {
        return c.redirect('/dashboard');
      }
      return next();
    }
  }
  deleteCookie(c, 'token');
  return next();
});

app.get('/login', async (c) => {
  return c.render(<SignInPage />);
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

app.post(
  '/login',
  zValidator('form', loginSchema, (result, c) => {
    if (!result.success) {
      c.status(400);
      // c.header('HX-Reswap', 'outerHTML');
      return c.html(
        <SignInPage
          form={result.data}
          formErrors={result.error.formErrors.fieldErrors}
        />
      );
    }
  }),
  async (c) => {
    const formData = c.req.valid('form');
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, formData.email))
      .limit(1);

    if (user.length < 1) {
      c.status(400);
      return c.html(
        <SignInPage errorMessage="Email belum terdaftar" form={formData} />
      );
    }

    if (!(await argon.verify(user[0].password, formData.password))) {
      c.status(400);
      return c.html(
        <SignInPage errorMessage="Kredensial salah" form={formData} />
      );
    }

    const payload = {
      sub: user[0].email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const token = await sign(payload, env.JWT_SECRET);

    await setSignedCookie(c, 'token', token, env.COOKIE_SECRET, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    c.header('HX-Replace-Url', '/dashboard');
    c.header('HX-redirect', '/dashboard');
    return c.text('');
  }
);

app.get('/register', (c) => {
  return c.render(<RegisterPage />);
});

const registerSchema = z.object({
  firstname: z.string().min(3).max(100),
  lastname: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

app.post(
  '/register',
  zValidator('form', registerSchema, (result, c) => {
    if (!result.success) {
      c.status(400);
      c.header('HX-Reswap', 'outerHTML');
      return c.html(
        <RegisterPage
          errors={result.error.formErrors.fieldErrors}
          form={result.data}
        />
      );
    }
  }),
  async (c) => {
    const formData = c.req.valid('form');
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, formData.email))
      .limit(1);

    if (user.length > 0) {
      c.status(400);
      return c.html(
        <RegisterPage form={formData} errorMessage="Email sudah terdaftar" />
      );
    }

    const hash = await argon.hash(formData.password);

    await db.insert(usersTable).values({
      email: formData.email,
      firstName: formData.firstname,
      lastName: formData.lastname,
      password: hash,
    });

    const payload = {
      sub: formData.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    };
    const token = await sign(payload, env.JWT_SECRET);

    await setSignedCookie(c, 'token', token, env.COOKIE_SECRET, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    c.header('HX-Push-Url', '/dashboard');
    c.header('HX-Redirect', '/dashboard');
    return c.text('');
  }
);

app.post('/logout', async (c) => {
  await setSignedCookie(c, 'token', '', env.COOKIE_SECRET, {
    secure: true,
  });
  c.header('X-Logout-Trigger', 'true');
  c.header('HX-Redirect', '/');
  return c.text('');
});

export default app;
