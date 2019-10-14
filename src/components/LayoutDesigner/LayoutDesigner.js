import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./LayoutDesigner.scss";
import LHSElements from "../LHSElement/LHSElements";
import indexSingleton from "../../helpers/IndexSingleton";
import {convertFromUILayoutToState, convertFromStateToUILayout} from "../../helpers/TransformationHelper";
import Element from "../Element";

const TypeLookup = {
  0: "Vertical",
  1: "Horizontal",
  2: "Element"
};

const LayoutDesigner = ({uiLayout}) => {
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    if(uiLayout){
      setLayout(uiLayout.rows.map(x => convertFromUILayoutToState(x)));
    }
  }, [uiLayout]);


  const TypeElementLookup = {
    Element: config => {
      return (
          <Element {...{...config.config}} type={config.type} draggableId={config.draggableId} updateConfig={(config, id) => {
            const a = updateConfig(layout, id, config);
            return setLayout(a);
          }}/>
      );
    },
    Horizontal: input => buildDroppable(input),
    Vertical: input => buildDroppable(input)
  };

  const buildDroppable = config =>
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
                <Element {...config.config} type={config.type} draggableId={config.draggableId}
                         updateConfig={(config, id) => {
                           const a = updateConfig(layout, id, config);
                           return setLayout(a);
                         }}/>
                <div
                    className={`${config.type.toLowerCase()}Container`}
                >
                  {config.children.map((x, index) => {
                    return buildDraggable(x, index);
                  })}

                  {provided.placeholder}
                </div>
              </div>
          )}
        </Droppable>
    );

  const buildDraggable = (x, index) =>
    (
        <Draggable draggableId={x.draggableId} index={index} key={x.draggableId}>
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="elementContainer"
              >
                {TypeElementLookup[x.type](x)}
              </div>
          )}
        </Draggable>
    );

  const updateConfig = (configs, id, config) => {
    if(Array.isArray(configs))
      return configs.map( x => updateConfig(x, id, config));

    if(configs.draggableId === id) return {...configs, config: {...configs.config, ...config}};

    if(configs.type !== "Element") return {...configs, children: configs.children.map( x => updateConfig(x, id, config))};

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

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;

    indexSingleton.increment();
    const updatedState = updateState(
      destination.droppableId,
      destination.index,
      layout,
      destination.droppableId === "designerArea",
      {
        draggableId: indexSingleton.index,
        type: TypeLookup[source.index],
        config: {},
        children: []
      }
    );
    setLayout(updatedState.filter(x => x));
  };

  return (
    <div>
      <div onClick={() => {
        console.log(JSON.stringify(convertFromStateToUILayout(layout)));
      }}> Click to generate state </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          <div className="lhsContainer">
            <Droppable type="drop" droppableId="lhsArea">
              {(provided, snapshot) => <LHSElements provided={provided} />}
            </Droppable>
          </div>
          <div className="rhsContainer">
            <Droppable type="drop" droppableId="designerArea">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={
                    snapshot.isDraggingOver
                      ? { background: "lightgrey", padding: "10px" }
                      : { padding: "10px" }
                  }
                >
                  {layout && layout.map((x, index) => buildDraggable(x, index, null))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default LayoutDesigner;
