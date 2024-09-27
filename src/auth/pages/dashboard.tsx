import { transactions } from '@/db/schema/transactions';
import { html } from 'hono/html';
import { FC } from 'hono/jsx';
import TransactionBadge from '../components/transaction-badge';

type Transactions = typeof transactions.$inferSelect;

interface DashboardProps {
  transactions: Transactions[];
}

const DashboardPage: FC<DashboardProps> = (props) => {
  const date = new Date().toDateString();
  return (
    <div class={'flex-1'}>
      <div className="flex items-center justify-between">
        <h1 class={'text-3xl font-semibold'}>Dashboard</h1>
      </div>

      <div class={'grid grid-cols-5 grid-rows-2 py-6 gap-5'}>
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
            'col-span-3 col-start-3 row-span-3 bg-white rounded-lg px-5 py-3 space-y-3 shadow'
          }
        >
          <h3 class={'font-medium text-slate-700'}>Transaksi hari ini</h3>
          {props.transactions.length > 0 ? (
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
                {props.transactions.map((item) => (
                  <tr class="hover">
                    <td>
                      <TransactionBadge type={item.type} />
                    </td>
                    <td class={'font-medium'}>Rp {item.amount}</td>
                    <td>{item.categoryId}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p class={'text-slate-500 font-medium text-center'}>
              Belum ada transaksi hari ini
            </p>
          )}
        </section>
        <section
          class={
            'row-start-4 col-span-2 row-span-2 bg-white rounded-lg px-5 py-3 shadow flex flex-col'
          }
        >
          <h3 class={'font-medium text-slate-700'}>Berdasarkan Kategori</h3>
          <div class="max-h-[250px] mx-auto">
            <canvas id="myChart"></canvas>
          </div>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </section>
        <section
          class={
            'row-start-4 col-span-3 row-span-2 bg-white rounded-lg px-5 py-3 shadow flex flex-col'
          }
        >
          <h3 class={'font-medium text-slate-700'}>Pengeluaran & Pendapatan</h3>
          <div>
            <canvas id="barChart"></canvas>
          </div>
        </section>
      </div>

      {html`
        <script>
          var pieChart = document.getElementById('myChart');
          var barChart = document.getElementById('barChart');

          var pieData = {
            labels: ['Makanan', 'Pakaian', 'Entertainment', 'Kebutuhan'],
            datasets: [
              {
                label: 'Persentase',
                data: [0.3, 0.2, 0.1, 0.4],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(0, 165, 144)',
                ],
                hoverOffset: 4,
              },
            ],
          };

          new Chart(pieChart, {
            type: 'pie',
            data: pieData,
          });

          var barData = {
            labels: ['Januari', 'Februari', 'Maret', 'April'],
            datasets: [
              {
                label: '2024',
                data: [0.3, 0.2, 0.1, 0.4],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(0, 165, 144)',
                ],
                hoverOffset: 4,
              },
            ],
          };

          new Chart(barChart, {
            type: 'bar',
            data: barData,
          });
        </script>
      `}
    </div>
  );
};

export default DashboardPage;
