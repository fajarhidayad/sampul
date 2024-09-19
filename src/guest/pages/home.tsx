import { FC } from 'hono/jsx';
import ButtonLink from '../../components/button-link';

const HomePage: FC = () => {
  return (
    <>
      <section
        class={'h-48 py-32 flex flex-col items-center max-w-4xl mx-auto'}
      >
        <h1 class="text-6xl font-extrabold text-slate-800 text-center leading-snug mb-10">
          Mengatur <span class={'text-primary'}>Keuangan</span> Anda Dengan
          Lebih <span class={'text-primary'}>Mudah</span> dan Tanpa Perlu{' '}
          <span class={'text-primary'}>Ribet</span>
        </h1>
        <p class={'text-center mb-8 text-slate-600 text-xl'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          tempora corporis qui minima doloribus ut quisquam facere ipsam ducimus
          enim!
        </p>
        <div
          className="flex items-center justify-self-center space-x-5"
          hx-boost="true"
        >
          <ButtonLink href="/dashboard">Mulai</ButtonLink>
          <a
            href="/bantuan"
            class={
              'border-2 border-primary rounded-md px-8 py-2 text-primary font-medium'
            }
          >
            Pelajari
          </a>
        </div>
      </section>
    </>
  );
};

export default HomePage;
