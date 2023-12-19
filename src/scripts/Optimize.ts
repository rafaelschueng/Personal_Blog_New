import { FindImages } from './Find.ts'

export async function OptimizeImages () {
    const images = await FindImages();
    const assets = images.filter(image => image.path.toString().includes('asset'))

    /*
        make all raw folder to preserve original images, move original image to raw path
        and scale images in 3 sizes like 100%, 66% and 33% outside of raw images paths.
    */ 
} 