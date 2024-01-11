type Images = {
  original: string | URL;
  conversions: Array<string | URL>;
};

function CreateImageLookupTable(path: string | URL) {
  try {
    console.log('The image lookup table doesnt exists!\n Creating a new lookup table!');
    const images: Images = {original:``, conversions: []}
    Deno.writeTextFileSync(path, JSON.stringify(images))
  } catch (error) {
    console.error(new Error(error));
  }
}

function ImageLookupTableExists() {}

function UpdateImageLookupTable() {}
