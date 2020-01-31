import { currMouseAction, backToEdit } from "../menutools.js"
import { IC_IMG } from "../simulator.js";
import { MouseAction } from "./Enums.js";
import { colorMouseOver, fileManager } from "../simulator.js";

/**
 * @todo TODO
 */
export class Integrated {
    /**
     * 
     * @param {*} type 
     */
    constructor(type) {
        this.type = type;
        this.width = IC_IMG[this.type].width;
        this.height = IC_IMG[this.type].height;
        this.posX = mouseX - (this.width / 2);
        this.posY = mouseY - (this.height / 2);
        this.isSpawned = false;
        this.offsetMouseX = 0;
        this.offsetMouseY = 0;
        this.isMoving = false;
        this.isSaved = false;
    }

    /**
     * @todo TODO
     */
    draw() {
        if (!this.isSpawned) {
            this.posX = mouseX - (this.width / 2);
            this.posY = mouseY - (this.height / 2);
        }else if(!this.isSaved)
        {
            fileManager.saveState();
            this.isSaved = true;
        }

        if (this.isMoving) {
            this.posX = mouseX + this.offsetMouseX;
            this.posY = mouseY + this.offsetMouseY;
        }

        if (this.isMouseOver()) {
            noFill();
            strokeWeight(2);
            stroke(colorMouseOver[0], colorMouseOver[1], colorMouseOver[2]);
            rect(this.posX, this.posY, IC_IMG[this.type].width, IC_IMG[this.type].height);
        }

        image(IC_IMG[this.type], this.posX, this.posY);
    }

    /**
     * Checking if mouse is over this element
     * @returns {Boolean} Boolean value
     */
    isMouseOver() {
        if (mouseX > this.posX && mouseX < (this.posX + this.width)
            && mouseY > this.posY && mouseY < (this.posY + this.height))
            return true;
        return false;
    }

    /**
     * When mouse is clicked:
     *  -If this element is not spawned, Spawn this on mouse position, return to edit mode.
     * 
     *  -If mouse is over this element OR current mouse action is move, set this isMoving to true and move this element to mouse position  
     */
    mousePressed() {
        if (!this.isSpawned) {
            this.posX = mouseX - (this.width / 2);
            this.posY = mouseY - (this.height / 2);
            this.isSpawned = true;
            backToEdit();
            return;
        }

        if (this.isMouseOver() || currMouseAction == MouseAction.MOVE) {
            this.isMoving = true;
            this.offsetMouseX = this.posX - mouseX;
            this.offsetMouseY = this.posY - mouseY;
        }
    }

    /**
     * Function to call when mouse is clicked
     */
    mouseClicked()
    {
        // virtual
    }

    /**
     * Function to call when mouse is released:
     *  Stop this element.
     */
    mouseReleased() {
        this.isMoving = false;
    }

}