import { Child, FC } from 'hono/jsx';
import Header from '../components/header';

const BaseLayout: FC<{ children: Child }> = ({ children }) => {
  return (
    <html lang="en" data-theme="light">
      <Header title="Sampul" />
      <body class="bg-slate-100 container min-h-svh">{children}</body>
    </html>
  );
};

export default BaseLayout;
