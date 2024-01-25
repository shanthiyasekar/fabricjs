// src/FabricCanvas.js
import React, { useEffect } from 'react';
import { fabric } from 'fabric';
import pattern from "./img/pattern.jpg";

const FabricCanvas = () => {
  useEffect(() => {
    // Create fabric canvas
    const canvas = new fabric.Canvas('fabricCanvas');

    // Set canvas background color using a green rectangle
    const backgroundColorRect = new fabric.Rect({
      width: canvas.width,
      height: canvas.height,
      fill: 'green',
      selectable: false, // Make it unselectable
    });
    canvas.add(backgroundColorRect);

    
    const customPathData = 'M0 0 C2.70224827 0.56353136 5.4124676 1.07473551 8.125 1.58642578 C41.72112578 8.04946786 41.72112578 8.04946786 47.28125 16.05126953 C48.43359375 18.24267578 48.43359375 18.24267578 49.34375 20.48876953 C49.70726562 21.34212891 50.07078125 22.19548828 50.4453125 23.07470703 C52.86028485 29.56363272 50.90369479 35.23166124 48.20703125 41.29345703 C42.54961985 50.99526526 32.74530829 59.35195522 22.34375 63.48876953 C18.85880681 63.65471921 17.4734772 63.54341349 14.34375 62.48876953 C-2.34198747 57.00805284 -19.13362305 54.95192267 -36.65625 54.48876953 C-37.36974609 54.46685547 -38.08324219 54.44494141 -38.81835938 54.42236328 C-66.17279772 53.68238749 -95.36484519 55.32607833 -121.23828125 64.88720703 C-124.14641212 65.61071617 -125.81677355 65.41989655 -128.65625 64.48876953 C-130.54296875 63.17626953 -130.54296875 63.17626953 -132.34375 61.48876953 C-133.02695313 60.85841797 -133.71015625 60.22806641 -134.4140625 59.57861328 C-135.15398437 58.88896484 -135.89390625 58.19931641 -136.65625 57.48876953 C-137.47867188 56.76818359 -138.30109375 56.04759766 -139.1484375 55.30517578 C-152.60799938 43.50249006 -152.60799938 43.50249006 -154.65625 37.61376953 C-154.65625 36.58251953 -154.65625 35.55126953 -154.65625 34.48876953 C-154.66527344 33.72564453 -154.67429688 32.96251953 -154.68359375 32.17626953 C-154.44380387 25.33704499 -152.30097131 21.40930564 -147.65625 16.48876953 C-146.83125 15.60189453 -146.00625 14.71501953 -145.15625 13.80126953 C-136.72070613 7.26406372 -123.45044486 5.27310126 -113.28125 3.36376953 C-112.62516754 3.23870026 -111.96908508 3.11363098 -111.29312134 2.98477173 C-75.61726893 -3.75545327 -35.71661971 -7.60783696 0 0 Z';

    const customShape = new fabric.Path(customPathData, {
      fill: 'orange',
      left: 100,
      top: 150,
      originX: 'center',
      originY: 'center',
      angle: 360,
    });
    canvas.add(customShape);

    // Load pattern image
   const patternImageSrc = pattern;
    fabric.Image.fromURL(patternImageSrc, (patternImage) => {
      const boundingBox = customShape.getBoundingRect();

      // Calculate the offsetX and offsetY based on the bounding box
      const offsetX = boundingBox.left + boundingBox.width / 2 - patternImage.width / 2;
      const offsetY = boundingBox.top + boundingBox.height / 2 - patternImage.height / 2;

      console.log("Bounding Box:", boundingBox);
      console.log("OffsetX:", offsetX);
      console.log("OffsetY:", offsetY);

     customShape.set({
        fill: new fabric.Pattern({
          source: patternImage.getElement(),
          offsetX: offsetX, // Center the pattern
          offsetY: offsetY+20,
          repeat: 'repeat', // Ensure pattern follows the curve vertically
          // Dynamically calculate the rotation angle based on the orientation of the custom shape
          angle: customShape.angle || 0,
       
        }),
      });

      // Render the canvas
      canvas.renderAll();
    });

    // Clean up on unmount
    return () => {
      canvas.dispose();
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return <canvas id="fabricCanvas" width="400" height="400"></canvas>;
};

export default FabricCanvas;
