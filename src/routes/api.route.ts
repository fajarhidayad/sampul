import { Hono } from 'hono';

const app = new Hono();

let counter = 0;

app
  .get('/counter', (c) => {
    return c.text(counter.toString());
  })
  .post((c) => {
    counter++;
    return c.text(counter.toString());
  });

export default app;
