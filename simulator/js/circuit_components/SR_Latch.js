class SR_Latch extends Integrated
{
    constructor(type)
    {
        super(type);

        this.nodeSet = new Node(this.posX + 5, this.posY + 30);
        this.nodeReset = new Node(this.posX + 5, this.posY + this.height - 30);
        this.nodeQ = new Node(this.posX + this.width - 5, this.posY + 30, true);
        this.nodeNotQ = new Node(this.posX + this.width + 5, this.posY + this.height - 30, true);
    }

    destroy()
    {
        this.nodeSet.destroy();
        this.nodeReset.destroy();
        this.nodeQ.destroy();
        this.nodeNotQ.destroy();
    }


    draw()
    {
        super.draw();
        this.generateOutput();
        
        this.nodeSet.updatePosition(this.posX + 5, this.posY + 30);
        this.nodeReset.updatePosition(this.posX + 5, this.posY + this.height - 30);
        this.nodeQ.updatePosition(this.posX + this.width - 5, this.posY + 30);
        this.nodeNotQ.updatePosition(this.posX + this.width - 5, this.posY + this.height - 30);

        this.nodeSet.draw();
        this.nodeReset.draw();
        this.nodeQ.draw();
        this.nodeNotQ.draw();
    }

    generateOutput() // virtual
    {

    }

    mouseClicked()
    {
        let result = this.isMouseOver();
        result |= this.nodeSet.mouseClicked();
        result |= this.nodeReset.mouseClicked(); 
        result |= this.nodeQ.mouseClicked();
        result |= this.nodeNotQ.mouseClicked(); 
        return result;
    }

    convertToType(str)
    {
        switch(str)
        {
            case "NAND":
            return gateType.NAND;

            case "NOR":
            return gateType.NOR;
        }
    }
}

class SR_LatchAsync extends SR_Latch
{
    constructor(strGateType, stabilize)
    {
        super(IC_type.SR_LATCH_ASYNC);

        this.gateSet = null;
        this.gateReset = null;
        this.gateType = this.convertToType(strGateType);
        
        switch(this.gateType)
        {
            case gateType.NAND:
            this.gateSet = new Gate("NAND");
            this.gateReset = new Gate("NAND");
            break;

            case gateType.NOR:
            this.gateSet = new Gate("NOR");
            this.gateReset = new Gate("NOR");
            break;

            default:
            alert("Gate not supported for this IC");
            break;
        }


        if(stabilize)
        {
            // reset
            this.gateReset.input[0].value = true;
            this.gateSet.generateOutput();
            this.gateReset.generateOutput();
        }
    }

    destroy()
    {
        super.destroy();

        for(let i = 0; i < this.gateReset.input.length; i++)
        {
            this.gateReset.input[i].destroy();
            delete this.gateReset.input[i];
        }

        for(let i = 0; i < this.gateSet.input.length; i++)
        {
            this.gateSet.input[i].destroy();
            delete this.gateSet.input[i];
        }

    }

    generateOutput()
    {

        this.gateSet.input[0].value = this.nodeSet.value;
        this.gateSet.input[1].value = this.gateReset.output.value;

        this.gateReset.input[0].value = this.nodeReset.value;
        this.gateReset.input[1].value = this.gateSet.output.value;

        this.gateSet.generateOutput();
        this.gateReset.generateOutput();

        this.nodeQ.value = this.gateReset.output.value;
        this.nodeNotQ.value = this.gateSet.output.value;
    }

}

class SR_LatchSync extends SR_Latch
{
    constructor(strGateType, stabilize)
    {
        super(IC_type.SR_LATCH_SYNC);

        this.nodeClock = new Node(this.posX + this.width - 5, this.posY + (this.height / 2));
        this.asyncLatch = new SR_LatchAsync(strGateType, stabilize);
        this.gateSet = null;
        this.gateReset = null;
        this.gateType = this.convertToType(strGateType);
        
        switch(this.gateType)
        {
            case gateType.NAND:
            this.gateSet = new Gate("NAND");
            this.gateReset = new Gate("NAND"); 
            break;

            case gateType.NOR:
            this.gateSet = new Gate("AND");
            this.gateReset = new Gate("AND");
            break;

            default:
            alert("Gate not supported for this IC");
            break;
        }

        if(stabilize)
        {
            // reset
            this.gateReset.input[0].value = true;
            this.gateSet.generateOutput();
            this.gateReset.generateOutput();
        }
    }

    destroy()
    {
        this.nodeClock.destroy();
        this.gateSet.destroy();
        this.gateReset.destroy();
        this.asyncLatch.destroy();
    }

    draw()
    {
        super.draw();
        this.nodeClock.updatePosition(this.posX + 5, this.posY + (this.height / 2));
        this.nodeClock.draw();
    }

    generateOutput()
    {
        this.gateSet.input[0].value = this.nodeSet.value;
        this.gateSet.input[1].value = this.nodeClock.value;
        this.gateReset.input[0].value = this.nodeReset.value;
        this.gateReset.input[1].value = this.nodeClock.value;

        this.gateSet.generateOutput();
        this.gateReset.generateOutput();

        this.asyncLatch.nodeSet.value = this.gateSet.output.value;
        this.asyncLatch.nodeReset.value = this.gateReset.output.value;
        
        this.asyncLatch.generateOutput();

        if(this.gateType == gateType.NOR)
        {
            this.nodeQ.value = this.asyncLatch.nodeQ.value;
            this.nodeNotQ.value = this.asyncLatch.nodeNotQ.value;
        }else
        {
            // invert if NAND
            this.nodeNotQ.value = this.asyncLatch.nodeQ.value;
            this.nodeQ.value = this.asyncLatch.nodeNotQ.value;
        }
    }

    mouseClicked()
    {
        let result = super.mouseClicked();
        result |= this.nodeClock.mouseClicked();
        return result;
    }
}