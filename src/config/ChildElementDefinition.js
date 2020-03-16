import {ElementDefinition} from "../ElementDefinition";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

export class ChildElementDefinition extends ElementDefinition {
    constructor() {
        super("element", "Element", true, buildRHSElement, buildLHSElement);
    }
}

const buildRHSElement = (config, updateConfig) => <div className="elementBaseContainer">
    <TextField
        label="Id"
        value={config.id}
        onChange={e => updateConfig({id: e.target.value})}
        margin="normal"
    />
    <TextField
        label="Width"
        value={config.width || 12}
        onChange={e => updateConfig({width: e.target.value})}
        margin="normal"/>
    <FormControlLabel
        control={
            <Switch
                checked={config.filterMessage}
                onChange={e => updateConfig({filterMessage: e.target.checked})}
                color="primary"/>
        }
        label="Show Filter Message"
    />
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
    Element
</div>;
