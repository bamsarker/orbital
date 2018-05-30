export const scaleCanvas = (canvas, width, height, scale, pixelRatio) => {
    const ctx = canvas.getContext('2d')

    width = width || 256;
    height = height || 256;
    scale = scale || 1;
    pixelRatio = pixelRatio || window.devicePixelRatio || 1;

    canvas.width = scale * width * pixelRatio;
    canvas.height = scale * height * pixelRatio;

    canvas.style.width = `${scale * width}px`;
    canvas.style.height = `${scale * height}px`;

    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.scale(scale * pixelRatio, scale * pixelRatio);
}
export const getNumberById = (id) => {
    return parseFloat(document.getElementById(id).value)
}

export const onClick = (id, callback) => {
    document.getElementById(id).onclick = callback;
}