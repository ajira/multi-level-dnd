import {ElementDefinition} from "../ElementDefinition";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export class VerticalElementDefinition extends ElementDefinition {
    constructor() {
        super("vertical", "Vertical", buildRHSElement, buildLHSElement);
    }
}

const buildRHSElement = (config, updateConfig) => <div className="elementBaseContainer">
    <FormControlLabel
        control={
            <Switch
                checked={config.nospace}
                onChange={e => updateConfig({nospace: e.target.checked})}
                color="primary"
            />
        }
        label="No Space"
    />

    <FormControlLabel
        control={
            <Switch
                checked={config.showBorder}
                onChange={e => updateConfig({showBorder: e.target.checked})}
                color="primary"
            />
        }
        label="Show Border"
    />
</div>;



const buildLHSElement = provided => <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
>
    Vertical
</div>;
