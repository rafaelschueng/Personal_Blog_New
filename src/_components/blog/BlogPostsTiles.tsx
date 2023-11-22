import type { } from "react/types";
import type { PageData } from 'lume/core.ts'

interface IBlogPostsProperties {
  search: PageData
  datetime: boolean
  description: boolean
  posts: string
}

export default function (props: IBlogPostsProperties) {
  const posts = props.search.pages('post', '', parseInt(props?.posts));
  if (!posts.length) return (<span> No new posts </span>)
  return (
    <>
      {
        posts.map((post: any, index: number) => (
          <div key={index.toString()} className="blog-post-tiles">
            <a href={post.data.url}>
              <h5>🔗 {post.data.title}</h5>
              {(props.description) ? <span>{post.data.description}</span>: <></>}
              {(props.datetime) ? <small className="text-end">📅 {new Date(post.data.date).toLocaleDateString()}</small> : <></>}
            </a>
          </div>
        ))
      }
    </>
  )
}