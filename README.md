# Image-Processing-API

# To run the build:
npm run build
# To run the jasmine
npm run test 
# To start the server:
npm run start

# The Image API endpoint:
we use this if we want to show the original image, we write the name of one the image in the images folder
localhost:3000/api/imageName.jpg , 

This api to resize the image according to the width and height the user will enter in the URL
localhost:3000/api/resized/?image=imageName&width=&height= , 

If the user forgt to enter the width or height or tha name of image he will get an Error message tells him to enter valid height, width, and image name. 


