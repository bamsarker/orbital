import { drawRedRect, drawGreyRect, drawWhiteRect, explosion } from './drawtils.js'
import { clamp, distance } from './utils.js'

class Ship {
    constructor(position, params) {
        this.position = position
        this.speed = { x: 0, y: 0 }
        this.size = 2
        this.maxSpeed = params.maxSpeed || 1.5
        this.acceleration = params.acceleration || 0.1
        this.previousPositions = []
        this.allPreviousPositions = []
        this.killed = false
        this.attackRange = params.attackRange || 2
        this.kills = 0
    }

    draw() {
        if (this.killed) {
            drawRedRect(this.position.x, this.position.y, this.size, this.size);
        } else {
            this.previousPositions
                .map((pos) => (drawGreyRect(pos.x, pos.y, this.size / 2, this.size / 2)))
            drawWhiteRect(this.position.x, this.position.y, this.size, this.size);
        }
    }

    updatePosition() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }

    updateSpeed() {
        this.speed.x += clamp(this.target.position.x - this.position.x, this.acceleration)
        this.speed.y += clamp(this.target.position.y - this.position.y, this.acceleration)

        this.speed.x = clamp(this.speed.x, this.maxSpeed)
        this.speed.y = clamp(this.speed.y, this.maxSpeed)
    }

    attack() {
        if (this.killed) return;

        if (distance(this.target.position, this.position) < this.attackRange) {
            this.target.killed = true;
            this.achieveKill();
            explosion(this.target.position)
        }
    }

    achieveKill() {
        this.kills++;
        // this.maxSpeed += 0.25
        // this.acceleration += 0.025
        // console.log("NEW KILL", this.kills)
    }

    update() {
        if (this.killed || this.target == undefined) return;

        this.updateSpeed()
        this.updatePosition()
        this.attack()

        this.addPointToTrail(this.position.x, this.position.y)
    }

    addPointToTrail(x, y) {
        this.previousPositions.push({ x: x, y: y })
        this.allPreviousPositions.push({ x: x, y: y })
        if (this.previousPositions.length > 3) {
            this.previousPositions.shift();
        }
    }

    getClosest(positions) {
        let position = this.position;

        return positions.reduce((previous, current, i) => (
            distance(previous.position, position) < distance(current.position, position) ? previous : current
        ), positions[0])
    }
}

export { Ship as default }