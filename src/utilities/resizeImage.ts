import express from "express";
import sharp from "sharp";


const res = express.response;
/*
const resizeImage = async (
  nameOfImage: string,
  width: number,
  height: number
): Promise<string> => {
  const absoluteImagePath = path.join(`${pathOfImage}`,`${nameOfImage}.jpg`);
  const absoluteResizedImagePath = path.join(
    `${pathOfResizedImage}`,
    `${nameOfImage}+W${width}xH${height}.jpg`
  );
  try {
    await sharp(absoluteImagePath)
      .resize(width, height)
      .jpeg()
      .toFile(absoluteResizedImagePath);

  } catch (error) {
    console.log(error);
    res.send(error);
  }
  return absoluteResizedImagePath;
};

*/

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
