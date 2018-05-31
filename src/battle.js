import { randomBattlePosition, beginPath, drawCurve, stroke } from './drawtils.js'
import { times, sample, shuffleArray } from './utils.js'
import Ship from './ship.js'

class Battle {
    constructor(numberOfShips, battleOptions, shipOptions) {
        this.ships = times(numberOfShips, () => (new Ship(randomBattlePosition(), shipOptions)))
        this.shipReTargetChance = battleOptions.shipReTargetChance == undefined ? (numberOfShips * (20 / 100))  / numberOfShips / 60 : battleOptions.shipReTargetChance;
        beginPath();
    }

    drawShips() {
        this.ships
            .filter((ship) => (ship.killed))
            .map((ship) => (ship.draw()))
        this.ships
            .filter((ship) => (!ship.killed))
            .map((ship) => (ship.draw()))
    }

    drawCurves() {
        this.ships.map((ship) => (ship.previousPositions))
            .filter((positions) => (positions.length > 1))
            .map((positions) => (drawCurve(positions)))
    }

    draw() {
        this.drawCurves();
        stroke();
        this.drawShips();
    }

    updateTargets() {
        this.ships
            .filter((s) => (!s.killed))
            .map((ship) => {
                let randomValue = Math.random();
                if (randomValue < this.shipReTargetChance) {
                    ship.target = sample(this.ships.filter((s) => (!s.killed)).filter((s) => (s !== ship)));
                } else if (ship.target == undefined || ship.target.killed) {
                    let closestShip = ship.getClosest(this.ships.filter((s) => (!s.killed)).filter((s) => (s !== ship)))

                    ship.target = closestShip;
                }
            })
    }

    updateShips() {
        //this.ships = this.ships.filter((s) => (!s.killed))
        shuffleArray(this.ships)
        this.updateTargets();
        this.ships.map((ship) => (ship.update()))
    }

    update() {
        if (this.ships.filter((s) => (!s.killed)).length > 1) {    
            this.updateShips();
        }
    }

    numberOfActiveShips() {
        return this.ships.filter((s) => (!s.killed)).length;
    }

}

export { Battle as default }