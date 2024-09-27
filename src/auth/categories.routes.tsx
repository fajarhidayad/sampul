import { db } from '@/db';
import { categories } from '@/db/schema/categories';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { html } from 'hono/html';
import CategoryTable from './components/category-table';
import CategoriesPage from './pages/categories';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import CategoryForm from './components/category-form';

const app = new Hono();

app.get('/options', async (c) => {
  const { sub } = c.get('jwtPayload');
  const categoryData = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, sub));

  if (categoryData.length < 1) {
    return c.html(html`
      <option disabled selected>Belum ada kategori</option>
    `);
  }

  return c.html(html`
    <option selected disabled>Pilih Kategori</option>
    ${categoryData.map((category) => (
      <option value={category.id}>{category.name}</option>
    ))}
  `);
});

app.get('/all', async (c) => {
  const { sub } = c.get('jwtPayload');
  const categoryData = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, sub));

  return c.html(<CategoryTable categories={categoryData} />);
});

app.get('/', async (c) => {
  return c.render(<CategoriesPage />);
});

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Nama kategori tidak boleh kosong' }),
  type: z.enum(['expense', 'income']),
});

app.post(
  '/',
  zValidator('form', categorySchema, (result, c) => {
    if (!result.success) {
      const { data, error } = result;
      return c.html(<CategoryForm formErrors={error.formErrors.fieldErrors} />);
    }
  }),
  async (c) => {
    const { sub } = c.get('jwtPayload');
    const formData = c.req.valid('form');

    await db.insert(categories).values({
      name: formData.name,
      type: formData.type,
      userId: Number(sub),
    });

    c.header('HX-Trigger', 'refreshTable, closeModal');
    return c.html(<CategoryForm />);
  }
);

app.put(
  '/:id',
  zValidator('form', categorySchema, (result, c) => {
    if (!result.success) {
      const { data } = result;
      return c.html(<CategoryForm />);
    }
  }),
  async (c) => {
    const formData = c.req.valid('form');

    await db.update(categories).set({
      name: formData.name,
      type: formData.type,
    });

    return c.text('Sukses');
  }
);

app.delete('/:id', async (c) => {
  const id = c.req.param('id');

  await db.delete(categories).where(eq(categories.id, Number(id)));

  return c.text('Sukses');
});

export default app;
