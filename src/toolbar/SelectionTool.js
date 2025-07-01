import {Controller} from "../Controller.js";

/** @private */
class SelectionTool extends Controller {

    selectedEntity;
    constructor(parent, cfg) {

        super(parent);

        if (!cfg.buttonElement) {
            throw "Missing config: buttonElement";
        }

        const buttonElement = cfg.buttonElement;

        this.on("enabled", (enabled) => {
            if (!enabled) {
                buttonElement.classList.add("disabled");
            } else {
                buttonElement.classList.remove("disabled");
            }
        });

        this.on("active", (active) => {
            if (active) {
                buttonElement.classList.add("active");
                this._onPick = this.viewer.cameraControl.on("picked", (pickResult) => {
                    if (!pickResult.entity) {
                        return;
                    }

                    if (this.selectedEntity && this.selectedEntity !== pickResult.entity) {
                        this.selectedEntity.selected = false;
                    }

                    if (!pickResult.entity.selected) {
                        pickResult.entity.selected = true;
                        this.selectedEntity = pickResult.entity;
                    }
                });
            } else {
                buttonElement.classList.remove("active");
                if (this._onPick !== undefined) {
                    this.viewer.cameraControl.off(this._onPick);
                    this._onPick = undefined;
                }
            }
        });

        buttonElement.addEventListener("click", (event) => {
            if (this.getEnabled()) {
                this.bimViewer._sectionTool.hideControl();
                const active = this.getActive();
                this.setActive(!active);
            }
            event.preventDefault();
        });

        this.bimViewer.on("reset", () => {
            this.setActive(cfg.active === true);
        });
    }
}

export {SelectionTool};