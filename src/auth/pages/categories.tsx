import PlusIcon from '@/components/icons/plus-icon';
import CategoryForm from '../components/category-form';
import Spinner from '@/components/spinner';
import { html } from 'hono/html';

const CategoriesPage = () => {
  return (
    <div class={'w-full'}>
      <section class={'flex justify-between mb-5 items-center'}>
        <h1 class={'text-2xl font-semibold text-slate-800'}>Semua Kategori</h1>
        <button class={'btn btn-primary'} onclick="add_transaction.showModal()">
          <PlusIcon /> Tambah
        </button>
        <dialog id="add_transaction" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <h2 class="font-medium text-xl text-slate-700">
                Tambah kategori baru
              </h2>
              <hr class="my-3" />
              <CategoryForm />
            </div>
          </div>
        </dialog>
      </section>
      <section
        class={'bg-white rounded-xl p-5 w-full shadow'}
        style="min-height: calc(100vh - 25%)"
      >
        <div class="overflow-auto">
          <table
            id="categoriesTable"
            class="table"
            hx-get="/dashboard/categories/all"
            hx-trigger="load, refreshTable from:body"
            hx-indicator="#spinner"
          >
            <Spinner id="spinner" />
          </table>
        </div>
      </section>

      {html`
        <script>
          document.body.addEventListener('closeModal', function () {
            add_transaction.close();
          });
        </script>
      `}
    </div>
  );
};

export default CategoriesPage;
