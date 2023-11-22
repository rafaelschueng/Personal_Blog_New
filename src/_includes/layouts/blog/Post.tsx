import type { } from "react/types";


interface IPostProps {
    comp: any
    title: string
    children: any
}

const Post = (props: IPostProps) => (
    <html lang="en">
        <head>
            <props.comp.global.GlobalHeaderTags title={props.title} />
            <link href="/assets/post/styles/post.css" rel="stylesheet" />
        </head>
        <body>
            <div className='container-fluid'>
                <div className='row'>
                    <props.comp.post.HeaderPost />
                    <div className='w-100'></div>
                    <div className='offset-2 col-8 post'>
                        <h1>{props.title}</h1>
                        <section>{props.children}</section>
                    </div>
                </div>
            </div>

        </body>
    </html>
);

export default Post;