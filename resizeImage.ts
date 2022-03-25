import sharp from "sharp";

// query segments
interface Resize_element {
  source: string;
  target: string;
  width: number;
  height: number;
}

const resizeImage = async (
  elements: Resize_element
): Promise<string> => {
  try {
    await sharp(`./images/${elements.source}.jpg`)
      .resize(elements.width, elements.height)
      .toFormat('jpg')
      .toFile(`./images/thumb/${elements.source}${elements.width}x${elements.height}.jpg`);
      return `./images/thumb/${elements.source}${elements.width}x${elements.height}.jpg`;
  } catch {
    return 'Image could not be processed.';
  }
};

export default resizeImage;
