import { Child, FC } from 'hono/jsx';

const ButtonLink: FC<{ children: Child; href: string }> = (props) => {
  return (
    <a
      hx-boost="true"
      href={props.href}
      class="font-medium rounded-md text-white text-lg bg-primary px-5 py-2"
    >
      {props.children}
    </a>
  );
};

export default ButtonLink;
