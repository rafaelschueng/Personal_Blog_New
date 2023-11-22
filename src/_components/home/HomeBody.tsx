import type { } from "react/types";

export default function ({ comp }: any) {
  return (
    <body>
      <div className="container-fluid g-0 vh-100">
        <div className="row g-0 vh-100">
          <div className="col main">
            <comp.home.MainContent />
          </div>
          <div className="col tiles">
            <comp.home.HomeTiles />
          </div>
        </div>
      </div>
    </body>
  )
}
