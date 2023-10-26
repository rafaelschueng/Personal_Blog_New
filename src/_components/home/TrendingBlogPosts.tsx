import type { } from "react/types";
import type { PageData } from 'lume/core.ts'

export default function ({ search }: PageData) {
    const posts = search.pages('blog', '', 4);
    if (!posts.length) return (<span> No new posts </span>)
    return (
        <ul>
            <h4>Postagens Recentes:</h4>
            {
                posts.map((post: any, index: number) => (
                    <a key={index.toString()} href={post.data.url}>
                        <li>
                            <h5>{post.data.title}</h5>
                            <span>{post.data.description}</span><br />
                            <small>{post.data.datetime}</small>
                        </li>
                    </a>
                ))
            }
        </ul>
    )
}