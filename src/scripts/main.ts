import { OptimizeAllImages } from './Optimize.ts'
import { FindAllImages } from 'scripts/Find.ts'
import { RegisterAllImages } from "./Register.ts"

(async () => {
  const images = await FindAllImages(`${Deno.cwd()}/testing`)
  await RegisterAllImages(images)
})()
