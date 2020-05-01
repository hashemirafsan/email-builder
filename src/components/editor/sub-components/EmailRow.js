import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class EmailRow extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }
    
    componentWillMount() {
        this.props.defaultRow.map((row, key) => {
            this.props.changeDefaultRowHtmlID(key)
        })
    }

    render() {
        return(
            <div className="email-row">
                <Droppable droppableId="drag_row">
                    {
                        (provided, snapshot) => {
                            //console.log(snapshot)
                            return (
                                <div 
                                    ref={provided.innerRef}
                                    className={`row-tools-group`}
                                >
                                    {
                                        
                                        this.props.defaultRow.map((row, key) => {
                                            
                                            return(
                                                
                                                <Draggable
                                                    key={key}
                                                    draggableId={row.values.meta.htmlID}
                                                    index={key}
                                                >
                                                    {
                                                        (provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    className={`row row-tool`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    {provided.placeholder}
                                                                    {
                                                                        row.col.map((col, key) => {
                                                                            return(
                                                                                <div key={key} className={`row-tool-column col-${col}`}>
                                                                                    <div className={`tool-column-content`}></div>
                                                                                </div>
                                                                                
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                </Draggable>
                                            );
                                        })
                                    }
                                </div>
                            );
                        }
                    }
                </Droppable>
            </div>
        );
    }
}

export default EmailRow;