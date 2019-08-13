let currMouseAction = MouseAction.EDIT;

function activeTool(elTool) 
{
    resetElements();
    if(elTool.getAttribute("isGate") != null)
    {
        gate.push(new Gate(elTool.getAttribute("tool")));
        return;
    }
    
    switch(elTool.getAttribute("tool"))
    {
        case "Edit":
        resetElements();
        break;

        case "Move":
        currMouseAction = MouseAction.MOVE;
        document.getElementById("canvas-sim").style.cursor = "move";
        break;
        
        case "Delete":
        currMouseAction = MouseAction.DELETE;
        break;
        
        case "LogicInput":
        logicInput.push(new LogicInput());
        break;

        case "LogicOutput":
        logicOutput.push(new LogicOutput());
        break;

        case "Clock":
        let period = document.getElementsByClassName("period")[0].value;
        let dutycycle = document.getElementsByClassName("duty-cycle")[0].value;
        logicClock.push(new Clock(period, dutycycle));
        break;

        case "SR_Latch":
        {
            let el = document.getElementsByClassName("SR_Latch-gate")[0];
            const gateType = el.options[el.selectedIndex].text;
            el = document.getElementsByClassName("SR_Latch-sync")[0];
            const _syncType = el.selectedIndex;
            const stabilize = document.getElementsByClassName("SR_stabilize")[0].checked;
            if(_syncType == syncType.ASYNC)
                srLatch.push(new SR_LatchAsync(gateType, stabilize));
            else
                srLatch.push(new SR_LatchSync(gateType, stabilize));
        }
        break;

        case "FF_D":
        {
            let el = document.getElementsByClassName("FF_D-Setting")[0];
            const isMasterSlave = el.selectedIndex; // because is 0 or 1
            if(isMasterSlave)
                flipflop.push(new FF_D_MasterSlave());
            else
                flipflop.push(new FF_D_Single());
        }
        break;

        case "FF_T":
        {
            let el = document.getElementsByClassName("FF_T-Setting")[0];
            const isNegativeEdgeTrig = el.selectedIndex; // because is 0 or 1
            if(isNegativeEdgeTrig)
                flipflop.push(new FF_T(true));
            else
                flipflop.push(new FF_T(false));
        }
        break;


        case "FF_JK":
        {
            let el = document.getElementsByClassName("FF_JK-Setting")[0];
            const isNegativeEdgeTrig = el.selectedIndex; // because is 0 or 1
            if(isNegativeEdgeTrig)
                flipflop.push(new FF_JK(true));
            else
                flipflop.push(new FF_JK(false));
        }
        break;
    }
    
    elTool.classList.add('active');
    
}
  
function resetElements() 
{
    currMouseAction = MouseAction.EDIT;
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