import { PreserveFiles } from "site/scripts/Backup.ts";
import { FindAllImages } from "./Find.ts";
import { ConvertAll } from "site/scripts/ImageMagick.ts";
import { RegisterAllImages } from "./Register.ts";
import { IsFileSystemURI } from "site/scripts/Utils.ts";

export async function OptimizeAllImages(workspace: URL, backupDirectory: URL | string) {
  /*
    1. Get all images;
    3. Make Backup of these images;
    2. Registry all Images;
    4. Convert all images;
   */
  IsFileSystemURI(workspace);
  const images = await FindAllImages(workspace);
  const backups = PreserveFiles(images, backupDirectory);
  await RegisterAllImages(images);
  ConvertAll(images);
}
