class Node
{
    constructor(posX, posY, isOutput = false, value = false)
    {
        this.diameter = 10;
        this.value = value;
        this.posX = posX;
        this.posY = posY;
        this.isOutput = isOutput;

        // no 2 inputs for node
        this.isInputOccupied = false;

        this.isAlive = true; // not destroyed
    }

    destroy()
    {
        this.isAlive = false;
    }

    draw()
    {
        if(this.value)
            fill(0, 255, 0);
        else
            fill(255, 0, 0);

        stroke(0);
        strokeWeight(4);
        circle(this.posX, this.posY, this.diameter);

    }

    getValue()
    {
        return this.value;
    }

    setValue(value)
    {
        this.value = value;
    }

    updatePosition(posX, posY)
    {
        this.posX = posX;
        this.posY = posY;
    }

    isMouseOver()
    {
        if(dist(mouseX, mouseY, this.posX, this.posY) < this.diameter / 2)
            return true;
        return false;
    }

    mouseClicked()
    {
        if(this.isMouseOver())
        {
            wireMng.addNode(this);
            return true;
        }
        return false;
    }
    

};