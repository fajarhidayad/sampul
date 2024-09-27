import { FC } from 'hono/jsx';
import { twMerge } from 'tailwind-merge';

interface TransactionBadgeProps {
  type: string;
}

const TransactionBadge: FC<TransactionBadgeProps> = (props) => {
  return (
    <p
      class={twMerge(
        'badge text-white',
        props.type === 'income' ? 'badge-success' : 'badge-error'
      )}
    >
      {props.type}
    </p>
  );
};

export default TransactionBadge;
