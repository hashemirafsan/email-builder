import React, { Component } from 'react';
import { DragDropContext,Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Tooltip, Dialog } from 'element-react';

class EmailPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowType: false,
            selectRow: false,
            rowDeleteDialogVisible: false
        }

    }

    componentWillReceiveProps(props) {
        console.log(props)
        this.props = props;
    }

    setContentList = (row,col, index) => {
        const { contents } = row.columns[index];
        
        if ( contents.length ) {
            console.log(contents.length, 'eeee')
            return(
                <Droppable droppableId="content">
                    {
                        (provided, snapshot) => {
                            return(
                                <div
                                    key={index}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    {...provided.draggableProps}
                                >
                                </div>
                            )
                        }
                    }
                </Droppable>
            )
        } else {
            console.log(contents.length,col, 'ffff')
            return (
                <div
                    key={index}
                    className={`sj_empty_placeholder col-${col}`}
                >
                    <span>No Content Here. Drag Something</span>
                </div>
            )
        }
    }

    onHover = (param, e) => {
        this.setState({ rowType: param });
    }

    rowLayerSelector = (index) => {
        this.setState({ selectRow: index });
    }

    rowLayerSelectorClassName = (index) => {
        return this.state.selectRow === index ? 'row-layer-selector-active' : 'row-layer-selector';
    }

    showRowType = (index) => {
        console.log(index, this.state.rowType)
        if ( index === this.state.rowType || (this.state.selectRow === 0 || this.state.selectRow)) {
        
            if (index === this.state.selectRow) {
                console.log('hokk')
                return(
                    <div
                        className={`row-editable-handle`}
                    >   
                        <Tooltip
                            placement="top-start"
                            content="Delete"

                        >
                            <Button 
                                type="danger" 
                                icon="delete" 
                                size="mini"
                                className="edit-button"
                                onClick={() => this.setState({ rowDeleteDialogVisible: true })}
                            ></Button>
                        </Tooltip>

                        <Tooltip
                            placement="top-start"
                            content="Copy"
                        >
                            <Button 
                                type="primary" 
                                icon="document" 
                                size="mini"
                                className="edit-button"
                                onClick={() => this.props.copyRow(index)}
                            ></Button>
                        </Tooltip>
                    </div>
                )
            }

            return(
                <div 
                    className={`row-layer-type`}
                    onMouseEnter={this.onHover.bind(this, index)}
                    onClick={() => {
                        this.props.showEditor('row_editor');
                        this.props.editAbleRow(index);
                        this.rowLayerSelector(index);
                    }}
                >Row</div>
            )
        }
    } 

    onMouseOut = (e) => {
        this.setState({ rowType: false });
    }

    showRowDeleteDialog = () => {
        return (
            <Dialog
                title="Delete Row"
                size="tiny"
                visible={ this.state.rowDeleteDialogVisible }
                onCancel={ () => this.setState({ rowDeleteDialogVisible: false }) }
                lockScroll={ false }
            >
                <Dialog.Body>
                    <span>Are you sure you want to delete this? This action cannot be undone.</span>
                </Dialog.Body>

                <Dialog.Footer className="dialog-footer">
                    <Button onClick={ () => this.setState({ rowDeleteDialogVisible: false }) }>Cancel</Button>
                    <Button 
                        type="danger" 
                        onClick={ () => {
                            this.props.removeRow(this.state.selectRow)
                            this.props.showEditor('main_editor')
                            this.setState({ 
                                rowDeleteDialogVisible: false,
                                selectRow: false
                            })
                            
                        } }
                    >Delete</Button>
                </Dialog.Footer>
            </Dialog>
        )
        // this.props.removeRow(index)
    }

    setRowList = (provided, snapshot) => {
        const { rows, values: { contentWidth } } = this.props.email;
        if (rows.length) {
            return (
                rows.map((row, key) => {
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
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            {...row}
                                            className={`preview-row-wrapper`}
                                            style={{
                                                backgroundColor: row.values.backgroundColor
                                            }}
                                        >
                                            <div
                                                className={this.rowLayerSelectorClassName(key)}
                                                id={`${row.values.meta.htmlID}`}
                                                onMouseEnter={this.onHover.bind(this, key)}
                                                onMouseOut={this.onMouseOut}
                                                onClick={() => {
                                                    this.props.showEditor('row_editor')
                                                    this.props.editAbleRow(key)
                                                    this.rowLayerSelector(key)
                                                }}
                                            >
                                                {
                                                    this.showRowType(key)
                                                }
                                            </div>
                                            <div 
                                                className="container"
                                                id={row.values.meta.htmlID}
                                                style={{
                                                    maxWidth: contentWidth,
                                                }}
                                            >
                                                <div 
                                                    className="row"
                                                    style={{
                                                        padding: row.values.padding
                                                    }}
                                                >
                                                    {
                                                        row.col.map((col, colKey) => {
                                                            const { values: { meta: { htmlID } } } = row.columns[colKey];
                                                            
                                                            if ( row.columns[colKey].contents.length ) {
                                                                // console.log(contents.length, 'eeee')
                                                                return(
                                                                    <Droppable key={htmlID} droppableId={`content_${htmlID}`} className={`content_${htmlID}`}>
                                                                        {
                                                                            (provided, snapshot) => {
                                                                                return(
                                                                                    <div
                                                                                        key={colKey}
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.droppableProps}
                                                                                        {...provided.draggableProps}
                                                                                    > 
                                                                                        {
                                                                                            row.columns[colKey].contents.map((content, contentKey) => {
                                                                                                return(
                                                                                                    <div key={contentKey}>
                                                                                                        { content.values.meta.htmlID }
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        }
                                                                    </Droppable>
                                                                )
                                                            } else {
                                                                // console.log(contents.length,col, 'ffff')
                                                                return (
                                                                    <div
                                                                        key={colKey}
                                                                        className={`col-${col} content_${htmlID}`}
                                                                    >
                                                                        <Droppable key={colKey} droppableId={`content_${htmlID}`}>
                                                                            {
                                                                                (provided, snapshot) => {
                                                                                    return(
                                                                                        <div
                                                                                            key={colKey}
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.droppableProps}
                                                                                            {...provided.draggableProps}
                                                                                            className={`sj_empty_placeholder`}
                                                                                        >
                                                                                            <span>No Content Here. Drag Something</span>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            }
                                                                        </Droppable>
                                                                        
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        </Draggable>
                    );
                })
            )
        } else {
            return (
                <div
                    className={`sj_empty_placeholder`}
                >
                    <span>No Content Here. Drag Something</span>
                </div>
            );
        }
    }

    render() {
        return(
            <div className="email-preview">
                <Droppable droppableId="drop_row" isDropDisabled={this.props.email.rowDraggingDisable}>
                    {
                        (provided, snapshot) => {
                            return (
                                <div ref={provided.innerRef}>
                                    {   
                                        this.setRowList(provided, snapshot)
                                    }
                                </div>
                            );
                        }
                    }
                </Droppable>
                {
                    this.showRowDeleteDialog()
                }
            </div>
        );
    }
}

export default EmailPreview;