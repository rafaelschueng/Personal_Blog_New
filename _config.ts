import preferences from "preferences/preferences.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import lume from "lume/mod.ts";

const site = lume(preferences);

site.use(jsx());
site.use(mdx());
site.copy("./assets", './assets')

export default site;

