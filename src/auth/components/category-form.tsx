import ErrorLabel from '@/components/error-label';
import Spinner from '@/components/spinner';
import { html } from 'hono/html';
import { FC } from 'hono/jsx';

interface CategoryFormProps {
  formErrors?: {
    name?: string;
    type?: string;
  };
}

const CategoryForm: FC<CategoryFormProps> = (props) => {
  return (
    <form
      class={'space-y-3'}
      hx-post="/dashboard/categories"
      hx-indicator="#spinner"
      hx-swap="outerHTML"
    >
      <label class="form-control w-full max-w-sm">
        <div class="label">
          <span class="label-text">Nama kategori</span>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          class="input input-bordered w-full max-w-sm"
        />
        <ErrorLabel>{props.formErrors?.name}</ErrorLabel>
      </label>
      <div class="form-control">
        <div class="label">
          <span class="label-text">Tipe transaksi</span>
        </div>
        <label class="label cursor-pointer justify-normal space-x-2">
          <input
            type="radio"
            name="type"
            id="type"
            class="radio checked:bg-red-500"
            value={'expense'}
            checked
          />
          <span class="label-text">Uang Keluar</span>
        </label>
        <label class="label cursor-pointer justify-normal space-x-2">
          <input
            type="radio"
            name="type"
            id="type"
            value={'income'}
            class="radio checked:bg-blue-500"
          />
          <span class="label-text">Uang Masuk</span>
        </label>
        <ErrorLabel>{props.formErrors?.type}</ErrorLabel>
      </div>
      <button class="btn btn-primary">
        Simpan <Spinner id="spinner" />
      </button>
    </form>
  );
};

export default CategoryForm;
