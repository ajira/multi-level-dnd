import {Draggable} from "react-beautiful-dnd";
import React from "react";

export class ElementDefinition {
    constructor(id, type, buildRHSElement, buildLHSElement) {
        this.id = id;
        this.type = type;
        this.buildRHSElement = buildRHSElement;
        this.buildLHSElement = buildLHSElement;
    }

    getLHSElement = index => <Draggable type="drop" key={this.type} draggableId={this.type} index={index}>
        {(provided, snapshot) =>this.buildLHSElement(provided)}
    </Draggable>;

    getRHSElement = (config, updateConfig) => this.buildRHSElement(config, updateConfig)
}
