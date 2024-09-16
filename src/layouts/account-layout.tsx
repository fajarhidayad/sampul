import { Child } from 'hono/jsx';

export default function AccountLayout(props: { children: Child }) {
  return (
    <main class={'grid grid-cols-2 h-screen'}>
      <section class={'p-20'}>
        <h1 class={'text-primary font-bold text-2xl'}>Sampul</h1>
      </section>
      <section
        class={'bg-blue-700/80 flex flex-col items-center justify-center'}
      >
        <div class={'space-y-4 my-auto'}>
          <a
            href="/"
            hx-boost="true"
            class={'text-white font-medium hover:underline self-start'}
          >
            &larr; kembali
          </a>
          {props.children}
        </div>
        <p class={'text-center text-sm text-slate-300 py-5'}>
          Copyright &copy; Fajar Hidayad &bull; Sampul
        </p>
      </section>
    </main>
  );
}
