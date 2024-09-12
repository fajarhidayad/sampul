import { FC } from 'hono/jsx';

const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" href="/static/global.css" />
      <script src="https://unpkg.com/htmx.org@2.0.2"></script>
    </head>
  );
};

export default Header;
