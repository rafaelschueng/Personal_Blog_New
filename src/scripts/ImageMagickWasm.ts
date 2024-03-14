import { initializeImageMagick, ImageMagick, MagickFormat} from "imagemagick/wasm";
import { ExtractMimetype } from "site/scripts/Utils.ts";
import { Plainning } from "site/scripts/ImageMagick.ts"


export interface IMagickArguments {
    resize: number,
}

function CalculatePercentage (value: number, percentage: number) {
    return Math.ceil(value * percentage)
}

export async function ConvertUsingWASM (source: URL, destination: URL, args: IMagickArguments) {
    const wasm = await Deno.readFile('./node_modules/@imagemagick/magick-wasm/dist/magick.wasm')
    await initializeImageMagick(wasm);
    const _source = await Deno.readFile(source)
    await ImageMagick.read(_source, async (img) => {
        const width = CalculatePercentage(img.width, args.resize);
        const height = CalculatePercentage(img.height, args.resize);
        img.resize(width, height);

        const _mimetype = ExtractMimetype(destination).toUpperCase()
        const newMimetype = Object.values(MagickFormat).find(value => value === _mimetype)

        const isInvalidMimetype = _mimetype.length === 0 || newMimetype === undefined
        if (isInvalidMimetype) throw new Error('Impossible to convert image! mimetype not exists or not supported')

        img.autoOrient()
        await img.write(newMimetype, async data => await Deno.writeFile(destination, data))
        console.log(`file: ${decodeURI(source.toString())} - width: ${width}; height: ${height}`)
    })
}

export async function ConvertAllUsingWASM (plainnings: Plainning[]) {
    const wasm = await Deno.readFile('./node_modules/@imagemagick/magick-wasm/dist/magick.wasm')
    await initializeImageMagick(wasm);
    console.log('ImageMagickWASM was been started...')
    const promises = plainnings.map(async (plainning) => {
        const source = await Deno.readFile(plainning.source)
        const destination = plainning.file;

        console.log(`Converting file ${plainning.source} into ${destination}`)
        await ImageMagick.read(source, async (img) => {
            const width = CalculatePercentage(img.width, plainning.commands.resize);
            const height = CalculatePercentage(img.height, plainning.commands.resize);
            img.resize(width, height);
    
            const _mimetype = ExtractMimetype(destination).toUpperCase()
            const newMimetype = Object.values(MagickFormat).find(value => value === _mimetype)
    
            const isInvalidMimetype = _mimetype.length === 0 || newMimetype === undefined
            if (isInvalidMimetype) throw new Error('Impossible to convert image! mimetype not exists or not supported')
    
            img.autoOrient()
            console.log(`Saving file in format: ${newMimetype} in path: ${destination}`)
            await img.write(newMimetype, async data => await Deno.writeFile(destination, data))
            console.log(`file: ${plainning.source} - width: ${width}; height: ${height}`)
        })
    })

    await Promise.all(promises)
}