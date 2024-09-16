import { Child, FC } from 'hono/jsx';
import HomeIcon from '../components/icons/home-icon';
import WalletIcon from '../components/icons/wallet-icon';
import HistoryIcon from '../components/icons/history-icon';
import SettingsIcon from '../components/icons/settings-icon';
import LogoutIcon from '../components/icons/logout-icon';
import { twMerge } from 'tailwind-merge';
import { html } from 'hono/html';

interface AuthLayoutProps {
  children: Child;
  path: string;
}

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  return (
    <div class={'flex flex-col h-screen container'}>
      {html`
        <script>
          document.body.addEventListener('htmx:beforeOnLoad', function (evt) {
            if (evt.detail.xhr.getResponseHeader('X-Logout-Trigger')) {
              window.history.replaceState(null, '', '/account/login');
              window.location.href = '/account/login';
              evt.preventDefault();
            }
          });
        </script>
      `}
      <nav class={'py-10 flex items-center'}>
        <a
          href="/dashboard"
          hx-boost="true"
          class={'mr-10 font-bold text-primary text-xl'}
        >
          Sampul
        </a>
        <input class={'rounded-full px-5 py-2'} placeholder="Search" />
        <div class={'flex items-center ml-auto space-x-3'}>
          <p class={'font-semibold text-lg'}>User</p>
          <button class={'w-10 h-10 bg-accent rounded-full text-white'}>
            U
          </button>
        </div>
      </nav>
      <main class="bg-slate-100 flex-1 flex pb-10">
        <aside class={'flex-shrink-0 mr-10 flex flex-col'}>
          <ul hx-boost="true" class={'flex flex-col bg-blue-400 rounded-full'}>
            <SidebarItem path={props.path} href="" name="dashboard">
              <HomeIcon />
            </SidebarItem>
            <SidebarItem path={props.path} href="/expense" name="expense">
              <WalletIcon />
            </SidebarItem>
            <SidebarItem path={props.path} href="/history" name="history">
              <HistoryIcon />
            </SidebarItem>
            <SidebarItem path={props.path} href="/settings" name="settings">
              <SettingsIcon />
            </SidebarItem>
          </ul>

          <a
            hx-post="/account/logout"
            hx-push-url="true"
            class={
              'bg-white border border-red-400 text-xs w-14 h-14 font-semibold text-red-400 flex items-center justify-center rounded-full mt-auto hover:cursor-pointer'
            }
          >
            <LogoutIcon />
          </a>
        </aside>
        {props.children}
      </main>
    </div>
  );
};

interface SidebarItemProps {
  children: Child;
  href: string;
  name: string;
  path: string;
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
  const href = `/dashboard${props.href}`;
  return (
    <li class={'tooltip tooltip-right'} data-tip={props.name}>
      <a
        class={twMerge(
          `w-14 h-14 rounded-full hover:bg-white/70 font-semibold text-white hover:text-primary flex items-center justify-center text-xs hover:cursor-pointer`,
          props.path === href ? 'bg-white/70 text-primary' : ''
        )}
        href={href}
      >
        {props.children}
      </a>
    </li>
  );
};

export default AuthLayout;
