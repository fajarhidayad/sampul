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
      <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
      <link rel="stylesheet" href="/static/global.css" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/charts.css/dist/charts.min.css"
      ></link>
      <script src="https://unpkg.com/htmx.org@2.0.2"></script>
      <script src="https://unpkg.com/htmx-ext-response-targets@2.0.0/response-targets.js"></script>
    </head>
  );
};

export default Header;
