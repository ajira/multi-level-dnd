import React from "react"
import {Draggable, Droppable} from "react-beautiful-dnd";

const LDraggable = ({config, layout, definitions, index, updateConfig, setLayout}) =>
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
                                updateConfig={updateConfig}
                                setLayout={setLayout}
                                key={index}
                                layout={layout}
                                definitions={definitions}
                    />
                </div>
            )}
        </Draggable>
    );

const LDroppable = ({definitions, config, layout, updateConfig, setLayout}) =>
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
                    {definitions[config.type]
                        .buildRHSElement(config.config,
                            x => setLayout(updateConfig(layout, config.draggableId, x))
                        )}

                    <div
                        className={`${config.type.toLowerCase()}Container`}
                    >
                        {config.children.map((x, index) => <LDraggable config={x}
                                                                       index={index}
                                                                       setLayout={setLayout}
                                                                       updateConfig={updateConfig}
                                                                       key={index}
                                                                       layout={layout}
                                                                       definitions={definitions}
                            />
                        )}

                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );


const RHS = ({definitions, layout, updateConfig, setLayout}) => <div className="rhsContainer">
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
                                                                layout={layout}
                                                                definitions={definitions}
                                                                index={index}
                                                                updateConfig={updateConfig}
                                                                setLayout={setLayout}
                                                                key={index}/>)}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
</div>;

export default RHS
