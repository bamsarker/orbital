export const randomBetween = (min, max) => {
    if (max == undefined) {
        max = min;
        min = 0;
    }
    max += 1;
    return (Math.random() * max) + min
}

export const clamp = (number, max) => {
    if (number < 0 && max > 0) {
        max = -max;
        return number < max ? max : number;
    }

    return number > max ? max : number;
}

export const sample = (array) => {
    return array[Math.floor(randomBetween(array.length - 1))]
}
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
export const times = (n, iteratee) => {
    let result = [], index = 0;
    while (++index < n) {
        result.push(iteratee(index));
    }
    return result;
}
export const modulo = (x, m) => ((x % m + m) % m)

export const averagePosition = (positions) => {
    let total = positions.reduce((t, p) => {
        t.x += p.x;
        t.y += p.y;
        return t;
    }, { x: 0, y: 0 })

    return {
        x: total.x / positions.length,
        y: total.y / positions.length
    }
}
export const distance = (p1, p2) => {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
export const forFrames = (frames, callback) => {
    let f = 0;
    let c = () => {
        if (f++ < frames) {
            callback();
            requestAnimationFrame(c);
        }
    }
    requestAnimationFrame(c)
}
