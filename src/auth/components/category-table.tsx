import EditIcon from '@/components/icons/edit-icon';
import TrashIcon from '@/components/icons/trash-icon';
import TransactionBadge from './transaction-badge';
import { categories } from '@/db/schema/categories';
import { FC } from 'hono/jsx';

type Category = typeof categories.$inferInsert;

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable: FC<CategoryTableProps> = (props) => {
  return (
    <>
      <thead>
        <tr>
          <th>No</th>
          <th>Jenis</th>
          <th>Nama</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {props.categories.map((item, index) => (
          <tr class="hover">
            <th>{index + 1}</th>
            <td>
              <TransactionBadge type={item.type} />
            </td>
            <td>{item.name}</td>
            <td class={'flex space-x-2'}>
              <button class={'btn btn-sm btn-warning text-white'}>
                <EditIcon />
              </button>
              <button
                hx-confirm="Apakah anda yakin ingin menghapus?"
                hx-delete={`/dashboard/categories/${item.id}`}
                class={'btn btn-sm btn-error text-white'}
              >
                <TrashIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default CategoryTable;
