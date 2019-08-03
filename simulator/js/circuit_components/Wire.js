class Wire
{
    constructor(startNode)
    {
        this.startNode = startNode;
        this.endNode = null;

        this.endX = mouseX;
        this.endY = mouseY;

        this.weight = 8;
    }

    draw()
    {
        stroke(0);
        strokeWeight(this.weight / 2);

        if(this.endNode == null)
        {
            line(this.startNode.posX, this.startNode.posY,
                mouseX, mouseY);

        }else if(this.startNode.isAlive && this.endNode.isAlive)
        {
            this.endNode.setValue(this.startNode.getValue());
            line(this.startNode.posX, this.startNode.posY,
                this.endNode.posX, this.endNode.posY);
        }else
        {
            this.endNode.setValue(false);
            return false; // destroy the wire
        }
                
        return true;
    }

    isMouseOver()
    {
        let distance = [];
        distance.push(dist(this.startNode.posX, this.startNode.posY,
                        mouseX, mouseY));
        distance.push(dist(this.endNode.posX, this.endNode.posY,
                        mouseX, mouseY));
        const wireLength = dist(this.startNode.posX, this.startNode.posY,
                        this.endNode.posX, this.endNode.posY);
        
        if(distance[0] + distance[1] >= wireLength-(this.weight / (10 * 2))
            && distance[0] + distance[1] <= wireLength+(this.weight / (10 * 2)))
            return true;
        return false;
    }

    getStartNode()
    {
        return this.startNode;
    }

    updateEnd(endX, endY)
    {
        this.endX = endX;
        this.endY = endY;
    }

    setEndNode(endNode)
    {
        if(endNode.isOutput)
        {
            let tempNode = this.startNode;
            this.startNode = endNode;
            this.endNode = tempNode;
        }else if((this.startNode.isOutput && endNode.isOutput)
                || (!this.startNode.isOutput && !endNode.isOutput))
        {
            // short circuit         
            this.startNode.setValue(this.startNode.getValue()
                                || endNode.getValue());
            endNode.setValue(this.startNode.getValue());
            this.endNode = endNode;
        }else
        {
            this.endNode = endNode;
        }
    }

}

class WireManager
{
    constructor()
    {
        this.wire = [];
        this.isOpened = false;
    }

    draw()
    {
        for(let i = 0; i < this.wire.length; i++)
        {
            let result = this.wire[i].draw();
            if(result == false) // wire is not valid
            {
                // destroy the wire
                delete this.wire[i];
                this.wire.splice(i, 1);
            }
        }
    }

    addNode(node)
    {
        if(this.isOpened == false)
        {
            this.wire.push(new Wire(node));
            this.isOpened = true;
        }else
        {
            let index = this.wire.length - 1;
            if(node != this.wire[index].getStartNode())
            {
                this.wire[index].setEndNode(node);
            }else
            {
                delete this.wire[index];
                this.wire.length--;
            }  
            this.isOpened = false;          
        }
    }

    mouseClicked()
    {
        for(let i = 0; i < this.wire.length; i++)
        {
            if(this.wire[i].isMouseOver())
            {
                // destroy the wire
                this.wire[i].endNode.setValue(false);
                delete this.wire[i];
                this.wire.splice(i, 1);
            }
        }
    }
}