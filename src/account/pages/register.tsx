import Spinner from '@/components/spinner';
import { FC } from 'hono/jsx';

interface RegisterProps {
  errorMessage?: string;
  errors?: {
    firstname?: string[];
    lastname?: string[];
    email?: string[];
    password?: string[];
  };
  form?: {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
  };
}

const RegisterPage: FC<RegisterProps> = (props) => {
  return (
    <div
      id="form"
      class={'bg-white rounded-lg px-5 py-7 shadow w-[450px]'}
      hx-ext="response-targets"
    >
      <div class={'mb-5 space-y-1'}>
        <h1 class={'font-semibold text-2xl'}>Buat akun baru</h1>
        <p class={'text-slate-600 text-sm'}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <form
        hx-post="/account/register"
        hx-target="#form"
        hx-target-400="#form"
        hx-swap="outerHTML"
        hx-indicator="#spinner"
        class={'flex flex-col space-y-4 mb-8'}
        method="post"
      >
        <div className="grid grid-cols-2 gap-x-3">
          <section>
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="firstname"
                id="firstname"
                class="grow"
                placeholder="Firstname"
                value={props.form?.firstname}
              />
            </label>
            {props.errors && props.errors.firstname && (
              <p class={'text-xs text-red-500 mt-1'}>
                {props.errors.firstname[0]}
              </p>
            )}
          </section>
          <section>
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="lastname"
                id="lastname"
                class="grow"
                placeholder="Lastname"
                value={props.form?.lastname}
              />
            </label>
            {props.errors && props.errors.lastname && (
              <p class={'text-xs text-red-500 mt-1'}>
                {props.errors.lastname[0]}
              </p>
            )}
          </section>
        </div>
        <section>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              name="email"
              id="email"
              class="grow"
              placeholder="Email"
              value={props.form?.email}
            />
          </label>
          {props.errors && props.errors.email && (
            <p class={'text-xs text-red-500 mt-1'}>{props.errors.email[0]}</p>
          )}
        </section>
        <section>
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              id="password"
              name="password"
              type="password"
              class="grow"
              placeholder="Password"
              value={props.form?.password}
            />
          </label>
          {props.errors && props.errors.password && (
            <p class={'text-xs text-red-500 mt-1'}>
              {props.errors.password[0]}
            </p>
          )}
        </section>
        {props.errorMessage && (
          <p class={'text-red-500 text-sm'}>{props.errorMessage}</p>
        )}
        <button type="submit" class={'btn btn-primary'}>
          Buat Akun
          <Spinner id="spinner" />
        </button>
      </form>

      <p class={'text-sm text-slate-500 text-center'}>
        Sudah punya akun?{' '}
        <a
          hx-boost="true"
          href="/account/login"
          class={'text-primary hover:underline hover:cursor-pointer'}
        >
          Masuk
        </a>
      </p>
    </div>
  );
};

export default RegisterPage;
