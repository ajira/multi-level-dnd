import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";
import "./LayoutDesigner.scss";
import LHS from "./LHS";
import RHS from "./RHS";
import indexSingleton from "../../helpers/IndexSingleton";

const LayoutDesigner = ({uiLayout, definitions}) => {
    const [layout, setLayout] = useState(uiLayout || null);

    const updateConfig = (configs, id, config) => {
        if (Array.isArray(configs))
            return configs.map(x => updateConfig(x, id, config));

        if (configs.draggableId === id) return {...configs, config: {...configs.config, ...config}};

        if (configs.type !== "Element") return {
            ...configs,
            children: configs.children.map(x => updateConfig(x, id, config))
        };

        return configs;
    };

    const updateState = (id, index, arr, matching, item) => {
        if (matching) {
            const clone = [].concat(arr);
            clone.splice(index, 0, item);
            return clone;
        }

        return arr.map(x => {
            if (x.type === "Element") return x;
            return {
                ...x,
                children: updateState(id, index, x.children, x.draggableId === id, item)
            };
        });
    };

    const onDragEnd = async ({source, destination}) => {
        if (!destination) return;

        indexSingleton.increment();
        console.log("OnDragEnd source is:", source);
        const updatedState = updateState(
            destination.droppableId,
            destination.index,
            layout,
            destination.droppableId === "designerArea",
            {
                draggableId: indexSingleton.index,
                type: definitions[source.index],
                config: {},
                children: []
            }
        );
        setLayout(updatedState.filter(x => x));
    };

    return (
        <div>
            <div onClick={() => {
                console.log(JSON.stringify(layout));
            }}> Click to generate state
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="container">
                    <LHS definitions={definitions}/>
                    <RHS definitions={definitions} layout={layout} updateConfig={updateConfig} setLayout={setLayout}/>
                </div>
            </DragDropContext>
        </div>
    );
};

export default LayoutDesigner;
