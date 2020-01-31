import { IC_type, gateType } from "./Enums.js";
import { Integrated } from "./Integrated.js";
import { Node } from "./Node.js";
import { SR_LatchSync } from "./SR_Latch.js";

/**
 * @todo TODO
 */
export class FF_D extends Integrated {
    /**
     * @todo TODO
     */
    constructor(type) {
        super(type);
        this.nodeD = new Node(this.posX + 5, this.posY + 30);
        this.nodeClock = new Node(this.posX + 5, this.posY + this.height - 30);
        this.nodeQ = new Node(this.posX + this.width - 5, this.posY + 30, true);
        this.nodeNotQ = new Node(this.posX + this.width + 5, this.posY + this.height - 30, true);
        this.nodeStartID = this.nodeD.id;
    }

    /**
     * @todo TODO
     */
    destroy() {
        this.nodeD.destroy();
        this.nodeClock.destroy();
        this.nodeQ.destroy();
        this.nodeNotQ.destroy();
    }

    /**
     * @todo TODO
     */
    draw() {
        super.draw();
        this.generateOutput();

        this.nodeD.updatePosition(this.posX + 5, this.posY + 30);
        this.nodeClock.updatePosition(this.posX + 5, this.posY + this.height - 30);
        this.nodeQ.updatePosition(this.posX + this.width - 5, this.posY + 30);
        this.nodeNotQ.updatePosition(this.posX + this.width - 5, this.posY + this.height - 30);

        this.nodeD.draw();
        this.nodeClock.draw();
        this.nodeQ.draw();
        this.nodeNotQ.draw();
    }

    /**
     * @todo TODO
     */
    refreshNodes()
    {
        let currentID = this.nodeStartID;

        this.nodeD.setID(currentID);
        currentID++;

        this.nodeClock.setID(currentID);
        currentID++;

        this.nodeQ.setID(currentID);
        currentID++;

        this.nodeNotQ.setID(currentID);

    }

    /**
     * @todo TODO
     */
    generateOutput() // virtual
    {

    }

    /**
     * @todo TODO
     */
    mouseClicked() {
        let result = this.isMouseOver();
        result |= this.nodeD.mouseClicked();
        result |= this.nodeClock.mouseClicked();
        result |= this.nodeQ.mouseClicked();
        result |= this.nodeNotQ.mouseClicked();
        return result;
    }

}

/**
 * @todo TODO
 */
export class FF_D_Single extends FF_D {
    constructor() {
        super(IC_type.FF_D_SINGLE);
        this.srLatchSync = new SR_LatchSync(gateType.NAND, true);

        this.nodeClock.value = true;
        this.generateOutput();
        this.nodeClock.value = false;
    }

    /**
     * @todo TODO
     */
    generateOutput() {
        this.srLatchSync.nodeSet.value = this.nodeD.value;
        this.srLatchSync.nodeReset.value = !this.nodeD.value;
        this.srLatchSync.nodeClock.value = this.nodeClock.value;

        this.srLatchSync.generateOutput();

        this.nodeQ.value = this.srLatchSync.nodeQ.value;
        this.nodeNotQ.value = this.srLatchSync.nodeNotQ.value;
    }
}

/**
 * @todo TODO
 */
export class FF_D_MasterSlave extends FF_D {
    constructor() {
        super(IC_type.FF_D_MASTERSLAVE);
        this.master = new FF_D_Single();
        this.slave = new FF_D_Single();
    }

    /**
     * @todo TODO
     */
    generateOutput() {
        this.master.nodeD.value = this.nodeD.value;
        this.master.nodeClock.value = this.nodeClock.value;

        this.master.generateOutput();

        this.slave.nodeD.value = this.master.nodeQ.value;
        this.slave.nodeClock.value = !this.nodeClock.value;

        this.slave.generateOutput();

        this.nodeQ.value = this.slave.nodeQ.value;
        this.nodeNotQ.value = this.slave.nodeNotQ.value;
    }

    /**
     * @todo TODO
     */
    draw() {
        super.draw();

        // negative edge-triggered
        fill(0xFF); // white
        stroke(0);
        strokeWeight(2);
        circle(this.posX + 17, this.posY + this.height - 30, 8);
    }
}