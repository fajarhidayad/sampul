import { Child, FC } from 'hono/jsx';
import ButtonLink from '@/components/button-link';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: Child;
  location: string;
  loggedIn: boolean;
}

const GuestLayout: FC<Props> = (props) => {
  return (
    <div class={'flex flex-col min-h-screen container'}>
      <nav class="flex items-center py-5 justify-between">
        <a hx-boost="true" href="/" class="font-bold text-primary text-2xl">
          Sampul
        </a>
        <ul
          hx-boost="true"
          class={'flex items-center justify-between space-x-10'}
        >
          <li class={'text-slate-500'}>
            <a
              href="/"
              class={twMerge(
                'hover:text-primary',
                props.location === '/' ? 'text-primary' : ''
              )}
            >
              Home
            </a>
          </li>
          <li class={'text-slate-500'}>
            <a
              href="/tentang"
              class={twMerge(
                'hover:text-primary',
                props.location === '/tentang' ? 'text-primary' : ''
              )}
            >
              Tentang
            </a>
          </li>
          <li class={'text-slate-500'}>
            <a
              href="/bantuan"
              class={twMerge(
                'hover:text-primary',
                props.location === '/bantuan' ? 'text-primary' : ''
              )}
            >
              Bantuan
            </a>
          </li>
        </ul>
        {props.loggedIn ? (
          <ButtonLink href="/dashboard">Dashboard</ButtonLink>
        ) : (
          <ButtonLink href="/account/login">Masuk</ButtonLink>
        )}
      </nav>
      <main class={'flex-1'}>{props.children}</main>
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
