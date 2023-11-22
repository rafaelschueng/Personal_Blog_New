export async function findByMimeType (mimetype: string, path: string): Promise<any> {
    for await (const entry of Deno.readDir(path) ) {
        if (entry.isDirectory) await findByMimeType(mimetype, `${path}/${entry.name}`)
        if (entry.name.includes(mimetype)) console.log(`Found: ${entry.name} in ${path}`)
    }
}