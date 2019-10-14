import React from "react";
import "./Element.scss";
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const Element = ({showBorder = false, nospace = false, width = 12, id, filterMessage = false, type, updateConfig, draggableId}) => {
    return(<div className="elementBaseContainer">
        {type ==="Element" &&
        <>
            <TextField
                label="Id"
                value={id}
                onChange={e => updateConfig({id: e.target.value}, draggableId)}
                margin="normal"
            />

            <TextField
                label="Width"
                value={width || 12}
                onChange={e => updateConfig({width: e.target.value}, draggableId)}
                margin="normal" />

            <FormControlLabel
                control={
                    <Switch
                    checked={filterMessage}
                    onChange={e => updateConfig({filterMessage: e.target.checked}, draggableId)}
                    color="primary"/>
                }
                label="Show Filter Message"
            />
        </>
        }

        <FormControlLabel
            control={
                <Switch
                    checked={nospace}
                    onChange={e => updateConfig({nospace: e.target.checked}, draggableId)}
                    color="primary"
                />
            }
            label="No Space"
        />

        <FormControlLabel
            control={
                <Switch
                    checked={showBorder}
                    onChange={e => updateConfig({showBorder: e.target.checked}, draggableId)}
                    color="primary"
                />
            }
            label="Show Border"
        />
    </div>)
};

export default Element;
