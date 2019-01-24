let global = require('./global');

function canvas2observation(cv) {
    // transfer canvas pixel to conv2 format
    // resize & grayscale
    const canvasData = cv.getImageData(0, 0, global.screenWidth, global.screenHeight).data;

    let len = canvasData.length, i = 0, luma;
    // convert by iterating over each pixel each representing RGBA
    for (; i < len; i += 4) {
        // calculate luma, here using Rec 709
        luma = canvasData[i] * 0.2126 + canvasData[i + 1] * 0.7152 + canvasData[i + 2] * 0.0722;
        // update target's RGB using the same luma value for all channels
        canvasData[i] = canvasData[i + 1] = canvasData[i + 2] = luma;
        canvasData[i + 3] = canvasData[i + 3];                            // copy alpha
    }
    gameboy.graphicsBlit();
}
