import { InsertImageOnLookupTable } from "scripts/ImageLookupTable.ts";
import { ImageLookupItem } from "scripts/types/ImageLookupItem.ts";
import { CreateHashFromFile } from "site/scripts/Utils.ts";
import { FileBackupPlainning } from "site/scripts/Backup.ts";

export async function RegisterAllImages(images: Array<FileBackupPlainning>) {
  const promises = images.map(async (image) => {
    const workspace = Deno.cwd().replaceAll(/\/{1,2}|\\{1,2}/g, "/");
    const regex = new RegExp(`(\/)${workspace}`, "gi");
    const path = image.files.origin.pathname.replace(regex, "");
    const data: ImageLookupItem = {
      name: image.name,
      path: path,
      md5: "",
      conversions: [image.files.backup],
    };
    data.md5 = await CreateHashFromFile(image.files.origin);
    return data;
  });

  const conversions = await Promise.all(promises);

  conversions.forEach((conversion) => InsertImageOnLookupTable(conversion));
}
