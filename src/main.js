import { setContext, clear } from './drawtils.js'
import { scaleCanvas, getNumberById, onClick } from './domtils.js'
import Battle from './battle.js'

const canvas = document.getElementById('canvas')
scaleCanvas(canvas, 512, 512, 1);
setContext(canvas.getContext('2d'));

const getShipParams = () => {
    return {
        maxSpeed: getNumberById('maxSpeed'),
        attackRange: getNumberById('attackRange'),
        acceleration: getNumberById('acceleration')
    }
}

const getBattleParams = () => {
    return {
        shipReTargetChance: (getNumberById('retargetChance') / 100) 
    }
}

let battle = new Battle(getNumberById('swarmSize'), getBattleParams(), getShipParams())

onClick('reload', () => {
    battle = new Battle(getNumberById('swarmSize'), getBattleParams(), getShipParams())
})

const draw = () => {

    clear()

    battle.draw();
}

const update = () => {
    if (battle.numberOfActiveShips() <= 1) {
        battle = new Battle(getNumberById('swarmSize'), getBattleParams(), getShipParams())
    }
    battle.update();

    draw();

    requestAnimationFrame(update);
}

update();