import React from "react"
import {Draggable, Droppable} from "react-beautiful-dnd";
import Element from "../Element";

const LDraggable = ({config, index, layout, updateConfig, setLayout}) =>
    (
        <Draggable draggableId={config.draggableId} index={index} key={config.draggableId}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="elementContainer"
                >
                    <LDroppable config={config}
                                layout={layout}
                                updateConfig={updateConfig}
                                åsetLayout={setLayout}
                                key={index}/>
                </div>
            )}
        </Draggable>
    );

const LDroppable = ({config, layout, updateConfig, setLayout}) =>
    (
        <Droppable
            type="drop"
            droppableId={config.draggableId}
            key={config.draggableId}
            direction={config.type.toLowerCase()}
        >
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={snapshot.isDraggingOver ? {
                        background: "lightgrey",
                        border: "1px dashed black"
                    } : {border: "1px dashed black"}}
                >
                    <Element {...config.config} type={config.type}
                             updateConfig={config => {
                                 const a = updateConfig(layout, config.draggableId, config);
                                 return setLayout(a);
                             }}/>
                    <div
                        className={`${config.type.toLowerCase()}Container`}
                    >
                        {config.children.map((x, index) => <LDraggable config={x}
                                                                       index={index}
                                                                       layout={layout}
                                                                       setLayout={setLayout}
                                                                       updateConfig={updateConfig}
                                                                       key={index}/>
                        )}

                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );


const RHS = ({layout, updateConfig, setLayout}) => <div className="rhsContainer">
    <Droppable type="drop" droppableId="designerArea">
        {(provided, snapshot) => (
            <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                    snapshot.isDraggingOver
                        ? {background: "lightgrey", padding: "10px"}
                        : {padding: "10px"}
                }
            >
                {layout && layout.map((x, index) => <LDraggable config={x}
                                                                index={index}
                                                                layout={layout}
                                                                updateConfig={updateConfig}
                                                                setLayout={setLayout}
                                                                key={index}/>)}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
</div>;

export default RHS
