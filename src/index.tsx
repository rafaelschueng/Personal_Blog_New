import GlobalHeaderTags from "site/components/global/HeaderTags.tsx";
import HomeBody from "site/components/home/HomeBody.tsx";
import type { } from "react/types";

export const renderOrder = 1;
export const title = 'Rafael Schueng'


export default function () {
  return (
    <html lang="en">
      <head>
        <GlobalHeaderTags title='My new Blog!' />
      </head>
      <HomeBody />
    </html>
  )
};
