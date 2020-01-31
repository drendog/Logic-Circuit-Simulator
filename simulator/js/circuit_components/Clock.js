import { LogicInput } from "./LogicInput.js";

/**
 * Digital Clock
 * @classdesc Digital Clock
 * @extends LogicInput
 */
export class Clock extends LogicInput {
    /**
     * @param {*} period TODO
     * @param {*} dutycycle TODO
     */
    constructor(period, dutycycle) {
        super();
        this.truePeriod = period * dutycycle / 100;
        this.falsePeriod = period * (100 - dutycycle) / 100;
        this.lastTick = new Date().getTime();
        this.strInfo = "CLOCK \nT = " + period + " ms\nD% = " + dutycycle;
    }

    /**
     * Function to call for drawing the Clock
     */
    draw() {
        const currTick = new Date().getTime();

        const period = (this.value) ? this.truePeriod : this.falsePeriod;
        if (currTick - this.lastTick > period) {
            this.toggle();
            this.lastTick = currTick;
        }

        super.draw();
    }

    /**
     * Function to display Clock Info
     */
    printInfo() {
        noStroke();
        fill(0);
        textSize(12);
        textStyle(NORMAL);
        text(this.strInfo, this.posX - 20, this.posY + 25);
    }
};