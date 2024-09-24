import EditIcon from '@/components/icons/edit-icon';
import TrashIcon from '@/components/icons/trash-icon';

const data = [
  {
    type: 'income',
    category: 'Gaji',
    description: 'Bulanan',
    amount: 6000000,
  },
  {
    type: 'expense',
    category: 'Makanan',
    description: 'Pagi',
    amount: 15000,
  },
  {
    type: 'expense',
    category: 'Laundry',
    description: '',
    amount: 25000,
  },
];

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
                <th>Jumlah</th>
                <th>Deskripsi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr class="hover">
                  <th>{index + 1}</th>
                  <td
                    class={
                      item.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {item.type}
                  </td>
                  <td>{item.category}</td>
                  <td
                    class={
                      item.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {item.amount}
                  </td>
                  <td>{item.description}</td>
                  <td class={'flex space-x-2'}>
                    <button class={'btn btn-sm btn-warning text-white'}>
                      <EditIcon />
                    </button>
                    <button
                      hx-confirm="Apakah anda yakin ingin menghapus?"
                      hx-delete="/"
                      class={'btn btn-sm btn-error text-white'}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ExpensePage;
