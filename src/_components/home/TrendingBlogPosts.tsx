import type { } from "react/types";
import type { PageData } from 'lume/core.ts'

export default function ({ search }: PageData) {
    const posts = search.pages('blog');
    if (!posts.length) return (<> No new posts </>)
    return (
        <ul>
            {posts?.map((post:any) => <li>{post.data}</li>)}
        </ul>
    )
}