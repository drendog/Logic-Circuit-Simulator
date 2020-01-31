import { Clock } from "./circuit_components/Clock.js";
import { FF_D_Single, FF_D_MasterSlave } from "./circuit_components/FF_D.js";
import { FF_JK } from "./circuit_components/FF_JK.js";
import { FF_T } from "./circuit_components/FF_T.js";
import { flipflop, logicInput, logicOutput, logicClock, gate, srLatch } from "./simulator.js";
import { Gate } from "./circuit_components/Gate.js";
import { LogicInput } from "./circuit_components/LogicInput.js";
import { LogicOutput } from "./circuit_components/LogicOutput.js";
import { MouseAction, syncType } from "./circuit_components/Enums.js"
import { SR_LatchSync, SR_LatchAsync, SR_Latch } from "./circuit_components/SR_Latch.js"

export let currMouseAction = MouseAction.EDIT;

/**
 * @todo TODO
 */
export function activeTool(elTool) {
    resetElements();
    if (elTool.getAttribute("isGate") != null) {
        gate.push(new Gate(elTool.getAttribute("tool")));
        return;
    }

    switch (elTool.getAttribute("tool")) {
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
            console.log(JSON.stringify({ logicInput }, ['logicInput', 'posX', 'posY', 'value']));
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
                if (_syncType == syncType.ASYNC)
                    srLatch.push(new SR_LatchAsync(SR_Latch.convertToType(gateType), stabilize));
                else
                    srLatch.push(new SR_LatchSync(SR_Latch.convertToType(gateType), stabilize));
            }
            break;

        case "FF_D":
            {
                let el = document.getElementsByClassName("FF_D-Setting")[0];
                const isMasterSlave = el.selectedIndex; // because is 0 or 1
                if (isMasterSlave)
                    flipflop.push(new FF_D_MasterSlave());
                else
                    flipflop.push(new FF_D_Single());
            }
            break;

        case "FF_T":
            {
                let el = document.getElementsByClassName("FF_T-Setting")[0];
                const isNegativeEdgeTrig = el.selectedIndex; // because is 0 or 1
                if (isNegativeEdgeTrig)
                    flipflop.push(new FF_T(true));
                else
                    flipflop.push(new FF_T(false));
            }
            break;


        case "FF_JK":
            {
                let el = document.getElementsByClassName("FF_JK-Setting")[0];
                const isNegativeEdgeTrig = el.selectedIndex; // because is 0 or 1
                if (isNegativeEdgeTrig)
                    flipflop.push(new FF_JK(true));
                else
                    flipflop.push(new FF_JK(false));
            }
            break;

    }

    elTool.classList.add('active');

}

/**
 * @todo this doc
 */
function resetElements() {
    currMouseAction = MouseAction.EDIT;
    let activeElements = document.getElementsByClassName("active");

    for (let i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.remove('active')
    }
    document.getElementById("canvas-sim").style.cursor = "default";
}

/**
 * Reset Element
 * then set current action to EDIT 
 */
export function backToEdit() {
    resetElements();
    document.getElementsByClassName("Edit")[0].classList.add("active");
    currMouseAction = MouseAction.EDIT;
}

/**
 * Save Option
 * Export All logic input and output on console
 */
export function save() {

    for (let i = 0; i < logicInput.length; i++) {
        console.log(logicInput[i].export());
    }
}