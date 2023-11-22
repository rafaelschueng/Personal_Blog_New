import type { } from "react/types";
import type { PageData } from 'lume/core.ts'

interface IBlogPostsProperties {
  search: PageData
  datetime: boolean
  description: boolean
  posts: string
}

export default function (props: IBlogPostsProperties) {
  const posts = props.search.pages('blog', '', parseInt(props?.posts));
  if (!posts.length) return (<span> No new posts </span>)
  return (
    <ul>
      {
        posts.map((post: any, index: number) => (
          <a key={index.toString()} href={post.data.url}>
            <li>
              <h5>{post.data.title}</h5>
              {(props.description)? <><span>{post.data.description}</span> <br/> </> : <></>}
              {(props.datetime)? <small>{post.data.datetime}</small> : <></> }
            </li>
          </a>
        ))
      }
    </ul>
  )
}