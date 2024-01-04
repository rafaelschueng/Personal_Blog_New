import { PreserveFiles } from "site/scripts/Backup.ts";
import { FindAllImages } from "./Find.ts";
import { ConvertAll } from "site/scripts/ImageMagick.ts";

export async function OptimizeAllImages(backupDirectory: string, workspace?: string | URL) {
  let images = await FindAllImages(workspace);
  ConvertAll(images)
  PreserveFiles(images, backupDirectory);
}
