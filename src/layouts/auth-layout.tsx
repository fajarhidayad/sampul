import { Child, FC } from 'hono/jsx';

interface AuthLayoutProps {
  children: Child;
}

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  return (
    <div class={'flex flex-col h-screen'}>
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
            <SidebarItem href="" name="dashboard">
              <HomeIcon />
            </SidebarItem>
            <SidebarItem href="/expense" name="expense">
              <WalletIcon />
            </SidebarItem>
            <SidebarItem href="/history" name="history">
              <HistoryIcon />
            </SidebarItem>
          </ul>

          <a
            href="/"
            hx-boost="true"
            class={
              'bg-white border border-red-400 text-xs w-14 h-14 font-semibold text-red-400 flex items-center justify-center rounded-full mt-auto'
            }
          >
            Exit
          </a>
        </aside>
        {props.children}
      </main>
    </div>
  );
};

const SidebarItem: FC<{ children: Child; href: string; name: string }> = (
  props
) => {
  return (
    <li class={'tooltip tooltip-right'} data-tip={props.name}>
      <a
        class={
          'w-14 h-14 rounded-full hover:bg-white/70 font-semibold text-white hover:text-primary flex items-center justify-center text-xs hover:cursor-pointer'
        }
        href={`/dashboard${props.href}`}
      >
        {props.children}
      </a>
    </li>
  );
};

const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-house"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
};

const WalletIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-wallet-minimal"
    >
      <path d="M17 14h.01" />
      <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
    </svg>
  );
};

const HistoryIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-history"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
};

export default AuthLayout;
