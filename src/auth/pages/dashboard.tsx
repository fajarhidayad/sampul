import PlusIcon from '../../components/icons/plus-icon';

const data = [
  {
    type: 'masuk',
    amount: '1,000,000',
    category: 'Freelance',
    description: '',
  },
  {
    type: 'keluar',
    amount: '34,000',
    category: 'Laundry',
    description: '',
  },
];

const DashboardPage = () => {
  const date = new Date().toDateString();
  return (
    <div class={'flex-1'}>
      <div className="flex items-center justify-between">
        <h1 class={'text-3xl font-semibold'}>Dashboard</h1>
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
            <h3 class="text-lg font-bold">Transaksi baru</h3>
          </div>
        </dialog>
      </div>

      <div class={'grid grid-cols-5 grid-rows-5 py-6 gap-5'}>
        <section
          class={'col-span-1 bg-white rounded-lg px-5 py-3 space-y-2 shadow'}
        >
          <h3 class={'font-medium text-slate-700'}>Saldo</h3>
          <h2 class={'font-semibold text-2xl text-blue-500'}>Rp 120jt</h2>
        </section>
        <section
          class={'col-span-1 bg-white rounded-lg px-5 py-3 space-y-2 shadow'}
        >
          <h3 class={'font-medium text-slate-700'}>Tanggal</h3>
          <h2 class={'font-semibold text-lg text-slate-800'}>{date}</h2>
        </section>
        <section
          class={
            'col-span-2 row-start-2 bg-white rounded-lg px-5 py-3 space-y-2 shadow'
          }
        >
          <h3 class={'font-medium text-slate-700'}>Pengeluaran</h3>
          <div class={'grid grid-cols-2'}>
            <div>
              <div class={'flex justify-between items-center'}>
                <p class={'text-sm text-slate-600'}>Hari ini</p>
              </div>
              <h2 class={'font-semibold text-xl text-red-500'}>Rp 100,000</h2>
            </div>
            <div>
              <div class={'flex justify-between items-center'}>
                <p class={'text-sm text-slate-600'}>Bulan ini</p>
              </div>
              <h2 class={'font-semibold text-xl text-red-500'}>Rp 100,000</h2>
            </div>
          </div>
        </section>
        <section
          class={
            'col-span-2 bg-white rounded-lg px-5 py-3 row-start-3 space-y-2 shadow'
          }
        >
          <h3 class={'font-medium text-slate-700'}>Pendapatan</h3>
          <div class={'grid grid-cols-2'}>
            <div>
              <div class={'flex justify-between items-center'}>
                <p class={'text-sm text-slate-600'}>Hari ini</p>
              </div>
              <h2 class={'font-semibold text-xl text-emerald-500'}>
                Rp 1,000,000
              </h2>
            </div>
            <div>
              <div class={'flex justify-between items-center'}>
                <p class={'text-sm text-slate-600'}>Bulan ini</p>
              </div>
              <h2 class={'font-semibold text-xl text-emerald-500'}>
                Rp 10,000,000
              </h2>
            </div>
          </div>
        </section>
        <section
          class={
            'col-span-3 col-start-3 row-span-5 bg-white rounded-lg px-5 py-3 space-y-3 shadow'
          }
        >
          <h3 class={'font-medium text-slate-700'}>Transaksi hari ini</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Jenis</th>
                <th>Jumlah</th>
                <th>Kategori</th>
                <th>Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr class="hover">
                  <td
                    class={
                      item.type === 'masuk'
                        ? 'text-emerald-500'
                        : 'text-red-500'
                    }
                  >
                    {item.type}
                  </td>
                  <td class={'font-medium'}>Rp {item.amount}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section
          class={
            'row-start-4 col-span-2 row-span-2 bg-white rounded-lg px-5 py-3 shadow'
          }
        >
          <h3 class={'font-medium text-slate-700'}>Kategori</h3>
          <div id="my-chart" class={'w-full max-w-[200px] mx-auto'}>
            <table class="charts-css pie hide-data">
              <caption> Pie Example #1 </caption>{' '}
              <tbody>
                <tr>
                  <td style="--start: 0.0; --end: 0.40;">
                    <span class="data"> $ 10K </span>
                  </td>
                </tr>{' '}
                <tr>
                  <td style="--start: 0.40; --end: 0.65;">
                    <span class="data"> $ 5K </span>
                  </td>
                </tr>{' '}
                <tr>
                  <td style="--start: 0.65; --end: 1;">
                    <span class="data"> $ 15K </span>
                  </td>
                </tr>{' '}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
