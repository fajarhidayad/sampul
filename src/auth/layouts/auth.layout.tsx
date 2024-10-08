import CategoryIcon from '@/components/icons/category-icon';
import HistoryIcon from '@/components/icons/history-icon';
import HomeIcon from '@/components/icons/home-icon';
import LogoutIcon from '@/components/icons/logout-icon';
import SettingsIcon from '@/components/icons/settings-icon';
import WalletIcon from '@/components/icons/wallet-icon';
import { html } from 'hono/html';
import { Child, FC } from 'hono/jsx';
import { twMerge } from 'tailwind-merge';

interface AuthLayoutProps {
  children: Child;
  path: string;
  fullName: string;
}

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const name = props.fullName.split(' ');
  const initial = name[0][0] + name[1][0];
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
          <p class={'font-semibold text-lg'}>{props.fullName}</p>
          <div className="avatar placeholder">
            <div className="bg-success text-white w-12 rounded-full">
              <span>{initial}</span>
            </div>
          </div>
        </div>
      </nav>
      <main class="bg-slate-100 flex-1 flex pb-10">
        <aside class={'flex-shrink-0 mr-10 flex flex-col'}>
          <ul hx-boost="true" class={'flex flex-col bg-blue-400 rounded-full'}>
            <SidebarItem path={props.path} href="" name="dashboard">
              <HomeIcon />
            </SidebarItem>
            <SidebarItem path={props.path} href="/expense" name="Transaksi">
              <WalletIcon />
            </SidebarItem>
            <SidebarItem path={props.path} href="/categories" name="Kategori">
              <CategoryIcon />
            </SidebarItem>
            <SidebarItem path={props.path} href="/history" name="history">
              <HistoryIcon />
            </SidebarItem>
            <SidebarItem path={props.path} href="/settings" name="Pengaturan">
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
