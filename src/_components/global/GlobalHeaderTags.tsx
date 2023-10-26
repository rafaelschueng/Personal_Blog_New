import type { } from "react/types";

interface HeaderProperties {
  title: string
}

export default function (props: HeaderProperties) {
  return (
    <>
      <meta name="author" content="Rafael Schueng" />
      <meta name="keywords" content="Personal Site" />
      <meta name="description" content="Rafael Schueng Personal Blog" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Open+Sans:wght@400;500;700;800&family=Titillium+Web:wght@400;700;900&display=swap" rel="stylesheet" />
      <link href="./assets/home/styles/home.css" rel="stylesheet" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content={"width=device-width, initial-scale=1.0"} />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
      <title>{props.title}</title>
    </>
  );
}
