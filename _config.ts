import preferences from "preferences/preferences.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import lume from "lume/mod.ts";
import { Magick } from "node/magickwand"
import { Page } from "lume/core.ts";

const site = lume(preferences);

site.use(jsx());
site.use(mdx());

site.copy("./assets", './assets')
site.copy("./static", './static')


async function findByMimeType (mimetype: string, path: string): Promise<any> {
    for await (const entry of Deno.readDir(path) ) {
        if (entry.isDirectory) await findByMimeType(mimetype, `${path}/${entry.name}`)
        if (entry.name.includes(mimetype)) console.log(`Found: ${entry.name} in ${path}`)
    }
}

await findByMimeType('.jpg', Deno.cwd())

export default site;

