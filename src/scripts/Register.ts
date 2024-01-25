import { Entries } from 'scripts/Find.ts'
import { InsertImageOnLookupTable } from 'scripts/ImageLookupTable.ts'
import { ImageLookupItem } from 'scripts/types/ImageLookupItem.ts'
import { CreateHashFromFile } from "site/scripts/Utils.ts";
import { CreateHashFromString, ObjectToString } from "site/scripts/Utils.ts";



export async function RegisterAllImages (images: Array<Entries>) {
    const promises = images.map(async image => {
        const workspace = Deno.cwd().replaceAll(/\/{1,2}|\\{1,2}/g, '/')
        const regex = new RegExp(`(\/)${workspace}`, 'gi')
        let path = image.path.pathname.replace(regex, '')
        const data: ImageLookupItem = {
            name : image.name,
            path : path,
            md5:'',
            conversions: []
        }
        data.md5 = await CreateHashFromFile(image.path)
        return data
    })
    
    const conversions = await Promise.all(promises);

    conversions.forEach(conversion => InsertImageOnLookupTable(conversion))
}