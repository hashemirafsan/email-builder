import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class EmailContent extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    render() {
        return(
            <div className="email-content">
                <Droppable droppableId="drag_content">
                    {
                        (provided, snapchat) => {
                            //console.log(snapchat, "po")
                            // if (snapchat.isDraggingOver) {
                            //     this.props.rowDraggingStatus(false, "raa")
                            // } else {
                            //     this.props.rowDraggingStatus(true, "raa")
                            // }
                            return(
                                <div
                                    ref={provided.innerRef}
                                    className={`row row-content-group`}
                                >
                                    {
                                        this.props.defaultContent.map((content, contentKey) => {
                                            return(
                                                <Draggable
                                                    key={contentKey}
                                                    draggableId={`${content.values.meta.htmlClassNames}_${contentKey}`}
                                                    index={contentKey}
                                                >
                                                    {
                                                        (provided, snapshot) => {
                                                            return(
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`content-tool`}
                                                                >
                                                                    {provided.placeholder}
                                                                    {content.type}
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                </Draggable>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    }
                </Droppable>
            </div>
        );
    }
}

export default EmailContent;