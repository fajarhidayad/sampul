import { Child } from 'hono/jsx';

const ErrorLabel = (props: { children?: Child }) => {
  if (!props.children) return null;

  return (
    <div class="label">
      <span class="label-text-alt text-red-500">{props.children}</span>
    </div>
  );
};

export default ErrorLabel;
