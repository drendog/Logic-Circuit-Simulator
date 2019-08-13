class LogicOutput
{
    constructor()
    {
        this.value = false;
        this.posX = mouseX;
        this.posY = mouseY;
        this.diameter = 25;
        this.isSpawned = false;
        this.isMoving = false;
        this.offsetMouseX = 0;
        this.offsetMouseY = 0;
        this.input = new Node(this.posX - 30, this.posY, false, this.value);
    }

    destroy()
    {
        this.input.destroy();
        delete this.input;
    }


    draw()
    {
        if(!this.isSpawned)
        {
            this.posX = mouseX;
            this.posY = mouseY;
        }

        fillValue(this.value);
        
        if(this.isMoving)
        {
            this.posX = mouseX + this.offsetMouseX;
            this.posY = mouseY + this.offsetMouseY;
        }
        stroke(0);
        strokeWeight(4);
        line(this.posX, this.posY, this.posX - 30, this.posY);
        circle(this.posX, this.posY, this.diameter);
        

        this.input.updatePosition(this.posX - 30, this.posY);
        this.value = this.input.getValue();
        this.input.draw();

        noStroke();
        fill(0);
        textSize(12);
        textStyle(NORMAL);
        text('LOG. OUTPUT', this.posX - 20, this.posY + 25);

        textSize(18);
        textStyle(BOLD);

        if(this.value)
            text('1', this.posX - this.diameter / 4, this.posY + this.diameter / 4);
        else
            text('0', this.posX - this.diameter / 4, this.posY + this.diameter / 4);

    }

    isMouseOver()
    {
        if(dist(mouseX, mouseY, this.posX, this.posY) < this.diameter / 2)
            return true;
        return false;
    }

    mousePressed()
    {
        if(!this.isSpawned)
        {
            this.posX = mouseX;
            this.posY = mouseY;
            this.isSpawned = true;
            backToEdit();
            return;
        }

        if(this.isMouseOver() || currMouseAction == MouseAction.MOVE)
        {
            this.isMoving = true;
            this.offsetMouseX = this.posX - mouseX;
            this.offsetMouseY = this.posY - mouseY;
        }
    }

    mouseReleased()
    {
        if(this.isMoving)
        {
            this.isMoving = false;
        }
        
    }

    mouseClicked()
    {
        if(this.isMouseOver() || this.input.isMouseOver())
        {
            this.input.mouseClicked();
            return true;
        }
        return false;
    }

}
