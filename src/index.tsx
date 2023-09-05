import GlobalHeaderTags from "site/components/global/HeaderTags.tsx";
import HomeBody from "site/components/home/HomeBody.tsx";
import type { } from "react/types";

export default () => (
  <html lang="en">
    <head>
      <GlobalHeaderTags title='Home Page' />
    </head>
    <HomeBody/>
  </html>
);
