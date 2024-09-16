import { Child, FC } from 'hono/jsx';
import Header from '../components/header';
import { html } from 'hono/html';

const BaseLayout: FC<{ children: Child }> = ({ children }) => {
  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang="en" data-theme="light">
        <Header title="Sampul" />
        <body class="bg-slate-100 min-h-svh">{children}</body>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </html>
    </>
  );
};
export default BaseLayout;
