import type { } from "react/types";

const Post = ({title, children, comp}: any) => (
    <html lang="en">
        <head>
            <comp.global.GlobalHeaderTags />
        </head>
        <body>
            {children}
        </body>
    </html>
);

export default Post;