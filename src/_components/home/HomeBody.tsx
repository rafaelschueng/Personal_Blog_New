import type { } from "react/types";

export default function ({ comp }: any) {
  return (
    <body>
      <div className="container g-0 vh-100">
        <div className="row g-0 vh-100">
          <div className="col main">
            <comp.home.MainContent footer />
          </div>
          <div className="col preview">
            <h4>Postagens Recentes:</h4>
            <comp.global.BlogPostsList datetime posts='4' />
          </div>
        </div>
      </div>
    </body>
  )
}
