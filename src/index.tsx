import type { } from "react/types";

export default function ({ comp }: any) {
  return (
    <html lang="en">
      <head>
        <comp.global.GlobalHeaderTags title={'Rafael Schueng'} />
      </head>
      <comp.home.HomeBody />
    </html>
  )
};
