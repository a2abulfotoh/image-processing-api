import app from '../index';
import supertest from 'supertest';
import resizeImage from "../utilities/resizeImage";
import path from "path";

const request = supertest(app);


/* This for testing the endpoints */
describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toEqual(200);
  });
  /* This for testing if the user gets the original image */
  it("test to get the original image using the api", async () => {
    const response = await request.get("/api/palmtunnel.jpg");
    expect(response.status).toBe(200);
  });
  
  /* This for testing when the user forget any parameter  */
  it("test /api/resized forget any parameter", async () => {
    const response = await request.get(
      "/api/resized/?image=palmtunnel&height=400"
    );
    expect(response.status).toEqual(400);
  });
});

describe("Test the image processing.", () => {
  it("The mission is done", async () => {
    const nameOfImage = "palmtunnel";
    const outputPath = path.normalize("./images/thumb/palmtunnel500x300.jpg");
    const expectedPath = await resizeImage({source: nameOfImage, width: 500,height: 300,
      target: ""
    });
    expect(path.normalize(expectedPath)).toBe(outputPath);
  });
});
