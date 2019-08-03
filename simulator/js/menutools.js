const MouseAction =
{
    EDIT: 0,
    MOVE: 1,
    DELETE: 2
}

let currMouseAction = MouseAction.EDIT;

function activeTool(elTool) 
{
    resetElements();
    if(elTool.getAttribute("isGate") != null)
        gate.push(new Gate(elTool.getAttribute("tool")));
    
    switch(elTool.getAttribute("tool"))
    {
        case 'Edit':
        currMouseAction = MouseAction.EDIT;
        resetElements();
        break;

        case 'Move':
        currMouseAction = MouseAction.MOVE;
        document.getElementById("canvas-sim").style.cursor = "move";
        break;
        
        case 'Delete':
        currMouseAction = MouseAction.DELETE;
        break;
        
        case "LogicInput":
        logicInput.push(new LogicInput());
        
        break;
        case "LogicOutput":
        logicOutput.push(new LogicOutput());
        break;
    }
    
    elTool.classList.add('active');
    
}
  
function resetElements() 
{
    let activeElements = document.getElementsByClassName("active");

    for (let i = 0; i < activeElements.length; i++)
    {
        activeElements[i].classList.remove('active')
    }
    document.getElementById("canvas-sim").style.cursor = "default";
}

function backToEdit() 
{
    resetElements();
    document.getElementsByClassName("Edit")[0].classList.add("active");
    currMouseAction = MouseAction.EDIT;
}