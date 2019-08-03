let gateIMG = [];
let gate = [];
let logicInput = [];
let logicOutput = [];
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

}

function mousePressed()
{
    for(let i = 0; i < gate.length; i++)
        gate[i].mousePressed();
    
    for(let i = 0; i < logicInput.length; i++)
        logicInput[i].mousePressed();
    
    for(let i = 0; i < logicOutput.length; i++)
        logicOutput[i].mousePressed();
}


function mouseReleased()
{
    for(let i = 0; i < gate.length; i++)
        gate[i].mouseReleased();
    
    for(let i = 0; i < logicInput.length; i++)
        logicInput[i].mouseReleased();

    for(let i = 0; i < logicOutput.length; i++)
        logicOutput[i].mouseReleased();
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

        wireMng.mouseClicked();
            
    }
}
