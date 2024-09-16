import { FC } from 'hono/jsx';

interface Props {
  errorMessage?: string;
  formErrors?: {
    email?: string;
    password?: string;
  };
  form?: {
    email: string;
    password: string;
  };
}

const SignInPage: FC<Props> = (props) => {
  return (
    <div
      id="form"
      hx-ext="response-targets"
      class={'bg-white rounded-lg p-5 shadow w-[400px]'}
    >
      <div class={'mb-5 space-y-1'}>
        <h1 class={'font-semibold text-2xl'}>Selamat Datang</h1>
        <p class={'text-slate-600 text-sm'}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <form
        method="post"
        hx-post="/account/login"
        hx-target="#form"
        hx-swap="outerHTML"
        hx-target-400="#form"
        class={'flex flex-col space-y-3 mb-8'}
      >
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
              value={props.form?.email}
              placeholder="Email"
            />
          </label>
          {props.formErrors?.email && (
            <p class={'text-red-500 text-sm mt-1'}>{props.formErrors.email}</p>
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
              type="password"
              id="password"
              name="password"
              value={props.form?.password}
              class="grow"
              placeholder="Password"
            />
          </label>
          {props.formErrors?.password && (
            <p class={'text-red-500 text-sm mt-1'}>
              {props.formErrors.password}
            </p>
          )}
        </section>
        {props.errorMessage && (
          <p class={'text-red-500 text-sm'}>{props.errorMessage}</p>
        )}
        <button type="submit" class={'btn btn-primary'}>
          Masuk
        </button>
      </form>

      <p class={'text-sm text-slate-500 text-center'}>
        Belum punya akun?{' '}
        <a
          hx-boost="true"
          href="/account/register"
          class={'text-primary hover:underline hover:cursor-pointer'}
        >
          Buat akun
        </a>
      </p>
    </div>
  );
};

export default SignInPage;
