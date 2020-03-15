import React from "react"
import {Droppable} from "react-beautiful-dnd";

const LHS = ({definitions}) => <div className="lhsContainer">
    <Droppable type="drop" droppableId="lhsArea">
        {
            (provided, snapshot) =>
                (<div {...provided.droppableProps} ref={provided.innerRef}>
                    {
                        definitions.map((definition, index) => definition.getLHSElement(index))
                    }
                    {provided.placeholder}
                </div>)
        }
    </Droppable>
</div>;

export default LHS

