import { FF_D_MasterSlave } from "./FF_D.js";
import { Gate } from "./Gate.js";
import { IC_type } from "./Enums.js";
import { Integrated } from "./Integrated.js";
import { Node } from "./Node.js";

/**
 * @todo TODO
 */
export class FF_JK extends Integrated {
    constructor(isNegativeEdgeTrig) {
        super(IC_type.FF_JK);
        this.nodeJ = new Node(this.posX + 5, this.posY + 30);
        this.nodeClock = new Node(this.posX + 5, this.posY + (this.height / 2));
        this.nodeK = new Node(this.posX + 5, this.posY + this.height - 30);
        this.nodeQ = new Node(this.posX + this.width - 5, this.posY + 30, true);
        this.nodeNotQ = new Node(this.posX + this.width + 5, this.posY + this.height - 30, true);
        this.ff_D = new FF_D_MasterSlave();
        this.orGate = new Gate("OR");
        this.andGate_Q = new Gate("AND");
        this.andGate_NotQ = new Gate("AND");
        this.isNegativeEdgeTrig = isNegativeEdgeTrig;
        this.nodeStartID = this.nodeJ.id;

    }

    /**
     * @todo TODO
     */
    destroy() {
        this.nodeK.destroy();
        this.nodeClock.destroy();
        this.nodeJ.destroy();
        this.nodeQ.destroy();
        this.nodeNotQ.destroy();
    }

    /**
     * @todo TODO
     */
    draw() {
        super.draw();
        this.generateOutput();

        this.nodeJ.updatePosition(this.posX + 5, this.posY + 30);
        this.nodeClock.updatePosition(this.posX + 5, this.posY + (this.height / 2));
        this.nodeK.updatePosition(this.posX + 5, this.posY + this.height - 30);
        this.nodeQ.updatePosition(this.posX + this.width - 5, this.posY + 30);
        this.nodeNotQ.updatePosition(this.posX + this.width - 5, this.posY + this.height - 30);

        this.nodeJ.draw();
        this.nodeClock.draw();
        this.nodeK.draw();
        this.nodeQ.draw();
        this.nodeNotQ.draw();

        if (this.isNegativeEdgeTrig) {
            fill(0xFF); // white
            stroke(0);
            strokeWeight(2);
            circle(this.posX + 17, this.posY + (this.height / 2), 8);
        }
    }

    /**
     * @todo TODO
     */
    refreshNodes()
    {
        let currentID = this.nodeStartID;

        this.nodeJ.setID(currentID);
        currentID++;

        this.nodeClock.setID(currentID);
        currentID++;

        this.nodeK.setID(currentID);
        currentID++;

        this.nodeQ.setID(currentID);
        currentID++;

        this.nodeNotQ.setID(currentID);

    }

    /**
     * @todo TODO
     */
    generateOutput() {
        let clockValue = this.isNegativeEdgeTrig ? this.nodeClock.value : !this.nodeClock.value;

        this.andGate_NotQ.input[0].value = this.nodeJ.value;
        this.andGate_NotQ.input[1].value = this.ff_D.nodeNotQ.value;
        this.andGate_Q.input[0].value = !this.nodeK.value;
        this.andGate_Q.input[1].value = this.ff_D.nodeQ.value;

        this.andGate_Q.generateOutput();
        this.andGate_NotQ.generateOutput();

        this.orGate.input[0].value = this.andGate_Q.output.value;
        this.orGate.input[1].value = this.andGate_NotQ.output.value;

        this.orGate.generateOutput();

        this.ff_D.nodeD.value = this.orGate.output.value;
        this.ff_D.nodeClock.value = clockValue;

        this.ff_D.generateOutput();

        this.nodeQ.value = this.ff_D.nodeQ.value;
        this.nodeNotQ.value = this.ff_D.nodeNotQ.value;
    }

    /**
     * @todo TODO
     */
    mouseClicked() {
        let result = this.isMouseOver();
        result |= this.nodeJ.mouseClicked();
        result |= this.nodeK.mouseClicked();
        result |= this.nodeClock.mouseClicked();
        result |= this.nodeQ.mouseClicked();
        result |= this.nodeNotQ.mouseClicked();
        return result;
    }

}
