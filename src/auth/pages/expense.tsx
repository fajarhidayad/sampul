const ExpensePage = () => {
  return (
    <div class={'w-full'}>
      <h1 class={'text-2xl font-semibold text-slate-800 mb-5'}>
        Semua Transaksi
      </h1>
      <section
        class={'bg-white rounded-xl p-5 w-full shadow'}
        style="min-height: calc(100vh - 25%)"
      >
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Jenis</th>
                <th>Kategori</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>
                  <button class={'btn btn-sm btn-error text-white'}>
                    Hapus
                  </button>
                </td>
              </tr>
              <tr class="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td></td>
              </tr>
              <tr class="hover">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ExpensePage;
