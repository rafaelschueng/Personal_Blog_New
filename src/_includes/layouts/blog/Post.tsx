import type { } from "react/types";

const Post = ({title, children}) => (
    <html lang="en">
        <head>
            <title>{title}</title>
        </head>
        <body>
            {children}
        </body>
    </html>
);

export default Post;