const TransactionForm = () => {
  return (
    <form
      class="space-y-3 w-full"
      hx-post="/dashboard/expense"
      method="post"
      hx-swap="outerHTML"
    >
      <label class="form-control w-full max-w-sm">
        <div class="label">
          <span class="label-text">Tanggal</span>
        </div>
        <input
          type="date"
          id="date"
          name="date"
          value={new Date().toISOString().slice(0, 10)}
          class="input input-bordered w-full max-w-sm"
        />
        <div class="label hidden">
          <span class="label-text-alt">Bottom Left label</span>
        </div>
      </label>
      <label class="form-control w-full max-w-sm">
        <div class="label">
          <span class="label-text">Jumlah uang</span>
        </div>
        <input
          type="number"
          placeholder="Masukkan jumlah"
          id="amount"
          name="amount"
          min={100}
          class="input input-bordered w-full max-w-sm"
        />
        <div class="label hidden">
          <span class="label-text-alt">Bottom Left label</span>
        </div>
      </label>
      <div class="form-control">
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
      </div>
      <label class="form-control w-full max-w-sm">
        <div class="label">
          <span class="label-text">Kategori</span>
        </div>
        <select
          class="select select-bordered"
          id="category"
          name="category"
          hx-get="/dashboard/categories/options"
          hx-trigger="load"
          hx-swap="innerHTML"
        >
          <option disabled selected>
            Pilih kategori
          </option>
        </select>
        <div class="label hidden">
          <span class="label-text-alt">Alt label</span>
        </div>
      </label>
      <label class="form-control w-full max-w-sm">
        <div class="label">
          <span class="label-text">Catatan (opsional)</span>
        </div>
        <input
          type="text"
          class="input input-bordered w-full max-w-sm"
          id="description"
          name="description"
        />
        <div class="label hidden">
          <span class="label-text-alt">Bottom Left label</span>
        </div>
      </label>
      <button class="btn btn-primary">Simpan</button>
    </form>
  );
};

export default TransactionForm;
