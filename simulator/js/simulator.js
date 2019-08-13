let gateIMG = []; // gates images
let IC_IMG = []; // integrated circuits images
let gate = [];
let logicInput = [];
let logicOutput = [];
let logicClock = [];
let srLatch = [];
let flipflop = [];
let wireMng;

function preload()
{
    gateIMG.push(loadImage('simulator/img/LogicInput.svg'));// For testing usage
    gateIMG.push(loadImage('simulator/img/NOT.svg'));
    gateIMG.push(loadImage('simulator/img/AND.svg'));
    gateIMG.push(loadImage('simulator/img/NAND.svg'));
    gateIMG.push(loadImage('simulator/img/OR.svg'));
    gateIMG.push(loadImage('simulator/img/NOR.svg'));
    gateIMG.push(loadImage('simulator/img/XOR.svg'));
    gateIMG.push(loadImage('simulator/img/XNOR.svg'));

    IC_IMG.push(loadImage('simulator/img/SR_Latch.svg')); // For testing usage
    IC_IMG.push(loadImage('simulator/img/SR_Latch.svg'));
    IC_IMG.push(loadImage('simulator/img/SR_Latch_Sync.svg'));
    IC_IMG.push(loadImage('simulator/img/FF_D.svg'));
    IC_IMG.push(loadImage('simulator/img/FF_D_MS.svg'));
    IC_IMG.push(loadImage('simulator/img/FF_T.svg'));
    IC_IMG.push(loadImage('simulator/img/FF_JK.svg'));
    
}

function setup()
{
    const canvHeight = windowHeight - 90;
    let canvas = createCanvas(windowWidth - 115, canvHeight);

    canvas.parent('canvas-sim');
    document.getElementsByClassName("tools")[0].style.height = canvHeight;

    wireMng = new WireManager();
}

function windowResized()
{
    const canvHeight = windowHeight - 90;
    resizeCanvas(windowWidth - 115, canvHeight);
    document.getElementsByClassName("tools")[0].style.height = canvHeight;
}

function draw()
{
    background(0xFF);
    stroke(0);
    strokeWeight(4);
    fill(0xFF)
    rect(0, 0, width, height);

    wireMng.draw();

    for(let i = 0; i < gate.length; i++)
        gate[i].draw();
    
    for(let i = 0; i < logicInput.length; i++)
        logicInput[i].draw();
    
    for(let i = 0; i < logicOutput.length; i++)
        logicOutput[i].draw();
    
    for(let i = 0; i < logicClock.length; i++)
        logicClock[i].draw();
    
    for(let i = 0; i < srLatch.length; i++)
        srLatch[i].draw();

    for(let i = 0; i < flipflop.length; i++)
        flipflop[i].draw();

}

function mousePressed()
{
    for(let i = 0; i < gate.length; i++)
        gate[i].mousePressed();
    
    for(let i = 0; i < logicInput.length; i++)
        logicInput[i].mousePressed();
    
    for(let i = 0; i < logicOutput.length; i++)
        logicOutput[i].mousePressed();
    
    for(let i = 0; i < logicClock.length; i++)
        logicClock[i].mousePressed();   
    
    for(let i = 0; i < srLatch.length; i++)
        srLatch[i].mousePressed();   

    for(let i = 0; i < flipflop.length; i++)
        flipflop[i].mousePressed();
}


function mouseReleased()
{
    for(let i = 0; i < gate.length; i++)
        gate[i].mouseReleased();
    
    for(let i = 0; i < logicInput.length; i++)
        logicInput[i].mouseReleased();

    for(let i = 0; i < logicOutput.length; i++)
        logicOutput[i].mouseReleased();

    for(let i = 0; i < logicClock.length; i++)
        logicClock[i].mouseReleased();

    for(let i = 0; i < srLatch.length; i++)
        srLatch[i].mouseReleased();

    for(let i = 0; i < flipflop.length; i++)
        flipflop[i].mouseReleased();
}

function doubleClicked()
{
    for(let i = 0; i < logicInput.length; i++)
        logicInput[i].doubleClicked();
}

function mouseClicked()
{
    if(currMouseAction == MouseAction.EDIT)
    {
        for(let i = 0; i < gate.length; i++)
            gate[i].mouseClicked();
        
        for(let i = 0; i < logicInput.length; i++)
            logicInput[i].mouseClicked();
        
        for(let i = 0; i < logicOutput.length; i++)
            logicOutput[i].mouseClicked();
        
        for(let i = 0; i < logicClock.length; i++)
            logicClock[i].mouseClicked();

        for(let i = 0; i < srLatch.length; i++)
            srLatch[i].mouseClicked();

        for(let i = 0; i < flipflop.length; i++)
            flipflop[i].mouseClicked();

    }else if(currMouseAction == MouseAction.DELETE)
    {
        for(let i = 0; i < gate.length; i++)
        {
            if(gate[i].mouseClicked())
            {
                gate[i].destroy();
                delete gate[i];
                gate.splice(i, 1);
            }
        }

        for(let i = 0; i < logicInput.length; i++)
        {
            if(logicInput[i].mouseClicked())
            {
                logicInput[i].destroy();
                delete logicInput[i];
                logicInput.splice(i, 1);
            }
        }

        for(let i = 0; i < logicOutput.length; i++)
        {
            if(logicOutput[i].mouseClicked())
            {
                logicOutput[i].destroy();
                delete logicOutput[i];
                logicOutput.splice(i, 1);
            }
        }

        for(let i = 0; i < logicClock.length; i++)
        {
            if(logicClock[i].mouseClicked())
            {
                logicClock[i].destroy();
                delete logicClock[i];
                logicClock.splice(i, 1);
            }
        }

        for(let i = 0; i < srLatch.length; i++)
        {
            if(srLatch[i].mouseClicked())
            {
                srLatch[i].destroy();
                delete srLatch[i];
                srLatch.splice(i, 1);
            }
        }

        for(let i = 0; i < flipflop.length; i++)
        {
            if(flipflop[i].mouseClicked())
            {
                flipflop[i].destroy();
                delete flipflop[i];
                flipflop.splice(i, 1);
            }
        }

        wireMng.mouseClicked();
            
    }
}
