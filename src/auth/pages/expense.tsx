import EditIcon from '@/components/icons/edit-icon';
import PlusIcon from '@/components/icons/plus-icon';
import TrashIcon from '@/components/icons/trash-icon';
import TransactionBadge from '../components/transaction-badge';

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
      <section class={'flex justify-between mb-5 items-center'}>
        <h1 class={'text-2xl font-semibold text-slate-800'}>Semua Transaksi</h1>
        <button class={'btn btn-primary'} onclick="add_transaction.showModal()">
          <PlusIcon /> Tambah
        </button>
      </section>
      <section
        class={'bg-white rounded-xl p-5 w-full shadow'}
        style="min-height: calc(100vh - 25%)"
      >
        <div class="overflow-auto">
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
                  <td>
                    <TransactionBadge type={item.type} />
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
