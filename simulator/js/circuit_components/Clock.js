class Clock extends LogicInput
{
    constructor(period, dutycycle)
    {
        super();
        this.truePeriod = period * dutycycle / 100;
        this.falsePeriod = period * (100 - dutycycle) / 100;
        this.lastTick = new Date();
        this.strInfo = "CLOCK \nT = " + period + " ms\nD% = " + dutycycle + "%";
    }


    draw()
    {
        const currTick = new Date();

        const period = (this.value) ? this.truePeriod : this.falsePeriod;

        if(currTick - this.lastTick > period)
        {
            this.toggle();
            this.lastTick = currTick;
        }
        
        super.draw();
    }

    printInfo()
    {
        noStroke();
        fill(0);
        textSize(12);
        textStyle(NORMAL);
        text(this.strInfo, this.posX - 20, this.posY + 25);
    }
};