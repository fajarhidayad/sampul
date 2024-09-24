import Spinner from '@/components/spinner';
import { Child, FC } from 'hono/jsx';

interface ProfileFormProps {
  errorMessage?: string;
  successMessage?: string;
  formErrors?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  form?: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

const ProfileForm: FC<ProfileFormProps> = (props) => {
  return (
    <form
      hx-put="/dashboard/settings/profile"
      hx-swap="outerHTML"
      class={'space-y-3'}
      hx-indicator="#spinner-profile"
    >
      <h2 class={'text-xl font-semibold text-slate-700'}>Profile</h2>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Nama depan</span>
        </div>
        <input
          type="text"
          placeholder="Nama depan"
          name="firstName"
          id="firstName"
          value={props.form?.firstName}
          class="input input-bordered w-full max-w-xs"
        />
        <ErrorLabel>{props.formErrors?.firstName}</ErrorLabel>
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Nama belakang</span>
        </div>
        <input
          type="text"
          placeholder="Nama belakang"
          name="lastName"
          id="lastName"
          value={props.form?.lastName}
          class="input input-bordered w-full max-w-xs"
        />
        <ErrorLabel>{props.formErrors?.lastName}</ErrorLabel>
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={props.form?.email}
          class="input input-bordered w-full max-w-xs"
        />
        <ErrorLabel>{props.formErrors?.email}</ErrorLabel>
      </label>
      {props.errorMessage && (
        <p class={'text-sm text-red-500'}>{props.errorMessage}</p>
      )}
      {props.successMessage && (
        <p class={'text-sm text-emerald-500'}>{props.successMessage}</p>
      )}
      <button class={'btn btn-primary'}>
        Update <Spinner id="spinner-profile" />
      </button>
    </form>
  );
};

const ErrorLabel = (props: { children?: Child }) => {
  if (!props.children) return null;

  return (
    <div class="label">
      <span class="label-text-alt text-red-500">{props.children}</span>
    </div>
  );
};

export default ProfileForm;
