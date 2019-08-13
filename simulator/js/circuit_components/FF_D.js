class FF_D extends Integrated
{
    constructor(type)
    {
        super(type);
        this.nodeD = new Node(this.posX + 5, this.posY + 30);
        this.nodeClock = new Node(this.posX + 5, this.posY + this.height - 30);
        this.nodeQ = new Node(this.posX + this.width - 5, this.posY + 30, true);
        this.nodeNotQ = new Node(this.posX + this.width + 5, this.posY + this.height - 30, true);

    }

    destroy()
    {
        this.nodeD.destroy();
        this.nodeClock.destroy();
        this.nodeQ.destroy();
        this.nodeNotQ.destroy();
    }

    draw()
    {
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

    generateOutput() // virtual
    {

    }

    mouseClicked()
    {
        let result = this.isMouseOver();
        result |= this.nodeD.mouseClicked();
        result |= this.nodeClock.mouseClicked(); 
        result |= this.nodeQ.mouseClicked();
        result |= this.nodeNotQ.mouseClicked(); 
        return result;
    }

}

class FF_D_Single extends FF_D
{
    constructor()
    {
        super(IC_type.FF_D_SINGLE);
        this.srLatchSync = new SR_LatchSync("NAND", true);

        this.nodeClock.value = true;
        this.generateOutput();
        this.nodeClock.value = false;
    }

    generateOutput()
    {
        this.srLatchSync.nodeSet.value = this.nodeD.value;
        this.srLatchSync.nodeReset.value = !this.nodeD.value;
        this.srLatchSync.nodeClock.value = this.nodeClock.value;

        this.srLatchSync.generateOutput();

        this.nodeQ.value = this.srLatchSync.nodeQ.value;
        this.nodeNotQ.value = this.srLatchSync.nodeNotQ.value;
    }
}

class FF_D_MasterSlave extends FF_D
{
    constructor()
    {
        super(IC_type.FF_D_MASTERSLAVE);
        this.master = new FF_D_Single();
        this.slave = new FF_D_Single();
    }

    generateOutput()
    {
        this.master.nodeD.value = this.nodeD.value;
        this.master.nodeClock.value = this.nodeClock.value;

        this.master.generateOutput();

        this.slave.nodeD.value = this.master.nodeQ.value;
        this.slave.nodeClock.value = !this.nodeClock.value;

        this.slave.generateOutput();

        this.nodeQ.value = this.slave.nodeQ.value;
        this.nodeNotQ.value = this.slave.nodeNotQ.value;
    }

    draw()
    {
        super.draw();

        // negative edge-triggered
        fill(0xFF); // white
        stroke(0);
        strokeWeight(2);
        circle(this.posX + 17, this.posY + this.height - 30, 8);
    }
}