import { modulo, randomBetween, distance, forFrames } from './utils.js'

let ctx;

export const drawRect = (fillStyle, x, y, w, h) => {
    x = modulo(x, 256)
    y = modulo(y, 256)
    ctx.fillStyle = fillStyle;
    ctx.fillRect(x, y, w, h);
}
export const fillStyles = {
    white: 'rgb(255, 255, 255)',
    red: 'rgb(155, 50, 50)',
    grey: 'rgb(100, 100, 100)'
}

export const setContext = _ctx => {
    ctx = _ctx
}
export const width = () => {
    return ctx.canvas.width
}
export const height = () => {
    return ctx.canvas.height
}
export const clear = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
export const beginPath = () => {
    ctx.beginPath();
}
export const stroke = () => {
    ctx.stroke();
}
export const drawWhiteRect = (x, y, w, h) => {
    return drawRect(fillStyles.white, x, y, w, h)
}
export const drawRedRect = (x, y, w, h) => {
    return drawRect(fillStyles.red, x, y, w, h)
}
export const drawGreyRect = (x, y, w, h) => {
    return drawRect(fillStyles.grey, x, y, w, h)
}
export const randomPosition = () => {
    return { x: randomBetween(0, ctx.canvas.width), y: randomBetween(0, ctx.canvas.height) }
}
export const centerPosition = () => {
    return { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 }
}
export const drawLine = (from, to) => {
    ctx.beginPath()
    ctx.moveTo(modulo(from.x, 256), modulo(from.y, 256));
    ctx.strokeStyle = fillStyles.white;
    ctx.lineTo(modulo(to.x, 256), modulo(to.y, 256));
    ctx.stroke();
}
export const drawCurve = (points) => {
    return;

    let normalisedPoints = points.map((point) => ({ x: modulo(point.x, 256), y: modulo(point.y, 256) }))
    ctx.moveTo((normalisedPoints[0].x), normalisedPoints[0].y);

    ctx.strokeStyle = fillStyles.grey;

    for (let i = 0; i < normalisedPoints.length - 1; i++) {
        if (distance(normalisedPoints[i], normalisedPoints[i + 1]) < 200) {
            ctx.lineTo(normalisedPoints[i].x, normalisedPoints[i].y);
        } else {
            ctx.moveTo((normalisedPoints[i + 1].x), normalisedPoints[i + 1].y);
        }
    }
}
export const explosion = (position) => {
    forFrames(3, () => {
        drawWhiteRect(position.x - 1, position.y - 1, 1, 1)
        drawWhiteRect(position.x + 1, position.y - 1, 1, 1)
        drawWhiteRect(position.x + 1, position.y + 1, 1, 1)
        drawWhiteRect(position.x - 1, position.y + 1, 1, 1)
    })
}