import preferences from "preferences/preferences.ts";
import jsx from "lume/plugins/jsx.ts";
import lume from "lume/mod.ts";

console.log("The build was started...")

const site = lume(preferences);
site.use(jsx());
site.copy("./assets", './assets')

export default site;

