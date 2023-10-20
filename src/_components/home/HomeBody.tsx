import type { } from "react/types";
import TredingBlogPosts from "./TrendingBlogPosts.tsx";

export default function () {
  return (
    <body>
      <div className="container-grid g-0 vh-100">
        <div className="row g-0 vh-100">
          <div className="col main">
            <h1 className="header">Hello!</h1>
            <div className="description">
              Description
            </div>
            <div className="footer">
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/linkedin">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="col preview">
            <TredingBlogPosts/>
          </div>
        </div>
      </div>
    </body>
  )
}
