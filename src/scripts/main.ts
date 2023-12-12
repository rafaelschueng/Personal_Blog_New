import { Info } from "./ImageMagick.ts";

(async () => {
    const info = await Info(`${Deno.cwd()}/src/assets/images/profile/profile.jpg`)
    console.log(info)
})();
