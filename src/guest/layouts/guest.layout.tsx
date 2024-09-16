import { Child, FC } from 'hono/jsx';
import ButtonLink from '@/components/button-link';

const GuestLayout: FC<{ children: Child }> = ({ children }) => {
  return (
    <div class={'flex flex-col min-h-screen container'}>
      <nav class="flex items-center py-5 justify-between">
        <a hx-boost="true" href="/" class="font-bold text-primary text-2xl">
          Sampul
        </a>
        <ul hx-boost="true" class={'flex items-center justify-between'}>
          <li class={'text-slate-500'}>
            <a href="/" class={'hover:text-primary'}>
              Home
            </a>
          </li>
          <li class={'text-slate-500'}>
            <a href="/tentang" class={'hover:text-primary'}>
              Tentang
            </a>
          </li>
          <li class={'text-slate-500'}>
            <a href="/pelajari" class={'hover:text-primary'}>
              Pelajari
            </a>
          </li>
        </ul>
        <ButtonLink href="/account/login">Masuk</ButtonLink>
      </nav>
      <main class={'flex-1'}>{children}</main>
      <footer
        class={
          'text-center py-5 border-t border-t-slate-300 text-slate-600 text-sm'
        }
      >
        <p>Copyright Fajar Hidayad &copy; 2024 &bull; sampul.my.id</p>
      </footer>
    </div>
  );
};

export default GuestLayout;
