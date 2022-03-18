import express from "express";
import path from "path";
import fs from "fs";

import resizeImage from "../../utilities/resizeImage";


const imageProcessing = express.Router();


/*The absolute path of the image after resizing it*/
const pathOfResizedImage = path.join(path.resolve("./"),"/images/thumb");
/*The absolute path of the image*/
const pathOfImage = path.join(path.resolve("./"),"/images");

imageProcessing.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const name: string = req.query.image as string;
    const height: number = parseInt(req.query.height as string);
    const width: number = parseInt(req.query.width as string);
    const originalImagePath = path.resolve(pathOfImage, `${name}.jpg`);
    /* check if the user enters a valid value for width and height, and enters the name of image or name of non existing image */
    if (
      !name ||
      (!fs.existsSync(originalImagePath) &&
        (isNaN(height) || !height || height <= 0) &&
        (isNaN(width) || !width || width <= 0))
    ) {
      /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
      res
        .status(400)
        .send(
          "Please enter the name of image, height and width greater than 1"
        );
        return;
    }
    
    /* check if the user doesn't enter the image name or enters a name of non existing image */
    if (!name || !fs.existsSync(originalImagePath)) {
      console.log(!fs.existsSync(originalImagePath));
      /* Return 400 because it's a Bad Request, The User uses incorrect Syntax in the Request */
      res.status(400).send("Please enter the name of image");
      return;
    }
    
    try {
      const image_R = path.resolve(
        pathOfResizedImage,
        `${name}${width}x${height}.jpg`
      );
      /* check if the resized image is exist in the thumb folder or not */
      if (fs.existsSync(image_R)) {
        res.sendFile(image_R);
        return;
      } else {
        const resizedImage = await resizeImage({source: name, width: width,height: height,
  target: ""
});
        //res.sendFile(resizedImage);
        try {
          res.sendFile(path.normalize(resizedImage));
        } catch (error) {
          res.status(400).send(error);
          console.log(resizedImage);
          console.log(path.normalize(resizedImage));

        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);

export { pathOfResizedImage, pathOfImage };
export default imageProcessing;
