import express from "express";
import imageProcessing from "./api/imageProcessing";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("WELCOME API");
});
/* It's used when we want to resize the image */
routes.use("/resized", imageProcessing);
/* To get The original image from the folder */
//routes.use("/", express.static("./images"));

export default routes;
