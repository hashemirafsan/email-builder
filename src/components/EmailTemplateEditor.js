// Component and plugins
import React, { Component } from 'react';
import EmailEditor from './editor/EmailEditor';
import EmailPreview from './preview/EmailPreview';
import EmailHtmlPreview from './preview/EmailHtmlPreview';
import EmailJsonView from './preview/EmailJsonView';
import {
    Layout,
    Tabs
} from 'element-react';
import { DragDropContext } from 'react-beautiful-dnd';
import { cloneDeep, findIndex, remove } from 'lodash';

// external important css
import 'element-theme-default';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-color-picker/assets/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import '../App.css';

class EmailTemplateEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
            email: {
                showEditor: 'main_editor',
                rowDraggingDisable: false,
                editableRow: null,
                rows: [],
                values: {
                    backgroundColor: "#ffffff",
                    contentWidth: 600,
                    fontFamily: {
                        label: "Arial",
                        value: "arial,helvetica,sans-serif"
                    },
                    backgroundImage: {
                        url: "",
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false
                    }
                },
                defaultContent: [
                    {
                        type: "button",
                        values: {
                            containerPadding: 10,
                            meta: {
                                htmlID: "u_content_button_3",
                                htmlClassNames: "u_content_button"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true,
                            buttonColors: {
                                color: "#FFFFFF",
                                backgroundColor: "#3AAEE0",
                                hoverColor: "#2A92BF"
                            },
                            textAlign: "center",
                            lineHeight: "120",
                            border: {},
                            borderRadius: 4,
                            padding: "10px 20px",
                            text: "Button Text",
                            calculateWidth: 110,
                            calculateHeight: 36,
                            contentIcon: {
                                iconName: "",
                                iconSize: 18
                            }
                        }
                    },
                    {
                        type: "divider",
                        values: {
                            containerPadding: 10,
                            meta: {
                                htmlID: "u_content_divider_3",
                                htmlClassNames: "u_content_divider"
                            },
                            width: 100,
                            selectable: true,
                            draggable: true,
                            deleteable: true,
                            textAlign: "center",
                            border: {
                                borderTopWidth: 1,
                                borderTopStyle: "solid",
                                borderTopColor: "#BBBBBB"
                            },
                            contentIcon: {
                                iconName: "",
                                iconSize: 18
                            }
                        }
                    },
                    {
                        type: "html",
                        values: {
                            containerPadding: 10,
                            meta: {
                                htmlID: "u_content_html_3",
                                htmlClassNames: "u_content_html"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true,
                            html: "<strong>Hello World</strong>",
                            contentIcon: {
                                iconName: "",
                                iconSize: 18
                            }
                        }
                    },
                    {
                        type: "image",
                        values: {
                            containerPadding: 10,
                            meta: {
                                htmlID: "u_content_image_3",
                                htmlClassNames: "u_content_image"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true,
                            src: {
                                url: "",
                                widht: 500,
                                height: 100
                            },
                            fullWidth: false,
                            textAlign: "center",
                            maxWidth: 100,
                            altText: "Image",
                            action: {
                                url: "",
                                target: ""
                            },
                            contentIcon: {
                                iconName: "",
                                iconSize: 18
                            }
                        }
                    },
                    {
                        type: "text",
                        values: {
                            containerPadding: 10,
                            meta: {
                                htmlID: "u_content_text_3",
                                htmlClassNames: "u_content_text"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true,
                            textAlign: "center",
                            color: "#000",
                            lineHeight: 140,
                            text: "This is blank text",
                            contentIcon: {
                                iconName: "",
                                iconSize: 18
                            }
                        }
                    }
                ],
                defaultRow: [
                    {
                        cells: [1],
                        col: [12],
                        columns: [
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_1",
                                        htmlClassName: "u_column"
                                    }
                                }
                            }
                        ],
                        values: {
                            backgroundColor: "",
                            backgroundImage: {
                                url: "",
                                fullWidth: true,
                                repeat: false,
                                cover: false,
                                center: true
                            },
                            padding: "10px",
                            columnsBackgroundColor: "",
                            meta: {
                                htmlID: "u_row_12",
                                htmlClassName: "u_row"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true
                        }
                    },
                    {
                        cells: [1,1],
                        col: [6,6],
                        columns: [
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_2",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_3",
                                        htmlClassName: "u_column"
                                    }
                                }
                            }
                        ],
                        values: {
                            backgroundColor: "",
                            backgroundImage: {
                                url: "",
                                fullWidth: true,
                                repeat: false,
                                cover: false,
                                center: true
                            },
                            padding: "10px",
                            columnsBackgroundColor: "",
                            meta: {
                                htmlID: "u_row_6_6",
                                htmlClassName: "u_row"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true
                        }
                    },
                    {
                        cells: [1,1,1],
                        col: [4,4,4],
                        columns: [
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_4",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_5",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_6",
                                        htmlClassName: "u_column"
                                    }
                                }
                            }
                        ],
                        values: {
                            backgroundColor: "",
                            backgroundImage: {
                                url: "",
                                fullWidth: true,
                                repeat: false,
                                cover: false,
                                center: true
                            },
                            padding: "10px",
                            columnsBackgroundColor: "",
                            meta: {
                                htmlID: "u_row_4_4_4",
                                htmlClassName: "u_row"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true
                        }
                    },
                    {
                        cells: [1,1,1,1],
                        col: [3,3,3,3],
                        columns: [
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_7",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_8",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_9",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_10",
                                        htmlClassName: "u_column"
                                    }
                                }
                            }
                        ],
                        values: {
                            backgroundColor: "",
                            backgroundImage: {
                                url: "",
                                fullWidth: true,
                                repeat: false,
                                cover: false,
                                center: true
                            },
                            padding: "10px",
                            columnsBackgroundColor: "",
                            meta: {
                                htmlID: "u_row_3_3_3_3",
                                htmlClassName: "u_row"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true
                        }
                    },
                    {
                        cells: [1,2],
                        col: [4,8],
                        columns: [
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_11",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_12",
                                        htmlClassName: "u_column"
                                    }
                                }
                            }
                        ],
                        values: {
                            backgroundColor: "",
                            backgroundImage: {
                                url: "",
                                fullWidth: true,
                                repeat: false,
                                cover: false,
                                center: true
                            },
                            padding: "10px",
                            columnsBackgroundColor: "",
                            meta: {
                                htmlID: "u_row_4_8",
                                htmlClassName: "u_row"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true
                        }
                    },
                    {
                        cells: [2,1],
                        col: [8,4],
                        columns: [
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_13",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_14",
                                        htmlClassName: "u_column"
                                    }
                                }
                            }
                        ],
                        values: {
                            backgroundColor: "",
                            backgroundImage: {
                                url: "",
                                fullWidth: true,
                                repeat: false,
                                cover: false,
                                center: true
                            },
                            padding: 10,
                            columnsBackgroundColor: "",
                            meta: {
                                htmlID: "u_row_8_4",
                                htmlClassName: "u_row"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true
                        }
                    },
                    {
                        cells: [1,2,1,2],
                        col: [2,4,2,4],
                        columns: [
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_15",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_16",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_17",
                                        htmlClassName: "u_column"
                                    }
                                }
                            },
                            {
                                contents: [],
                                values: {
                                    meta: {
                                        htmlID: "u_column_18",
                                        htmlClassName: "u_column"
                                    }
                                }
                            }
                        ],
                        values: {
                            backgroundColor: "",
                            backgroundImage: {
                                url: "",
                                fullWidth: true,
                                repeat: false,
                                cover: false,
                                center: true
                            },
                            padding: 10,
                            columnsBackgroundColor: "",
                            meta: {
                                htmlID: "u_row_1_2_1_2",
                                htmlClassName: "u_row"
                            },
                            selectable: true,
                            draggable: true,
                            deleteable: true
                        }
                    }
                ]
    
            }
        }
    }
    
    // Generate Random number for HTML ID
    genHtmlID = () => {
        return Math.floor(Math.random()*90000) + 10000;
    }

    // Set Content HTML ID when copy it from defaultContent
    setContentHtmlID = (columns) => {
        const column = cloneDeep(columns);
        const { htmlClassNames  } = column.values.meta;
        column.values.meta.htmlID = `${htmlClassNames}_${this.genHtmlID()}`;
        return column;
    }

    // Set Columns HTML ID
    setColumnsHtmlID = (columns) => {
        let newCol = [];
        columns.map((col) => {
            const { htmlClassName } = col.values.meta;
            col.values.meta.htmlID = `${htmlClassName}_${this.genHtmlID()}`; 
            newCol.push(col)
        });
        return newCol;
    }

    // Set Row HTML ID
    setRowHtmlID = ( item) => {
        item = cloneDeep(item);
        const { htmlClassName } =  item.values.meta;
        item.values.meta.htmlID =  `${htmlClassName}_${this.genHtmlID()}`;
        item.columns = this.setColumnsHtmlID(cloneDeep(item.columns));
        return item;
    }

    // Main Method to change HTML ID 
    changeDefaultRowHtmlID = async (index) => {
        const state = await { ...this.state }
        const { values: { meta: { htmlClassName } } } = await state.email.defaultRow[index];
        state.email.defaultRow[index].values.meta.htmlID = await `${htmlClassName}_${this.genHtmlID()}`;
        this.setState({ state });
    }

    /**
     * Drag N Drop Methos
     */

     // Get item
    getItem = (index) => this.state.email.defaultRow[index]

     //content move 
    onContentMove = (source, destination, srcIndex, destIndex, destId) => {
        const sourceClone  = Array.from(source);
        const destinationClone = Array.from(destination);
        const findDropIndex = findIndex(destinationClone[destIndex].columns, { values: { meta: { htmlID: destId } } });
        destinationClone[destIndex].columns[findDropIndex].contents.splice(
            destIndex,
            0,
            this.setContentHtmlID(sourceClone[srcIndex])
        )
        const state = { ...this.state }
        state.email.rows = destinationClone
        this.setState( { state } );
        // console.log(findDropIndex)
    }

    // Row Move
    onRowMove = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destinationClone = Array.from(destination);
        
        destinationClone
        .splice(
            droppableDestination.index, 
            0,
            this.setRowHtmlID(this.getItem(droppableSource.index)) 
        );
        const state = { ...this.state }
        state.email.rows = destinationClone
        this.setState({ state });
    }

    // Row Draggind Disable When Content Start Moving
    rowDraggingStatus = (status) => {
        const state = { ...this.state }
        state.email.rowDraggingDisable = status;
        this.setState({ state })
    }

    // dragNdrop Context Drag start
    onDragStart = (result) => {
        const { source, destination } = result;
        if (source.droppableId === "drag_content") {
            this.rowDraggingStatus(true);
        }
    }

    // DragNDrop Context Drag End Event 
    onDragEnd = (result) => {
        const { source, destination } = result;
        console.log(source, destination, 'ee')
        
        if (source && destination) {
            if (destination.droppableId === "drop_row" && source.droppableId === "drag_row") {
                this.onRowMove(
                    this.state.email.defaultRow,
                    this.state.email.rows,
                    source,
                    destination
                )
            }

            if (source.droppableId === "drag_content") {
                let destinationId = destination.droppableId.split("content_").join("");
                this.onContentMove(
                    this.state.email.defaultContent,
                    this.state.email.rows,
                    source.index,
                    destination.index,
                    destinationId
                )
            }
        }

        this.rowDraggingStatus(false)
 
    }

    /*=========================================
        Body Editor Method start
    ==========================================*/

    changeBodyContentWidth = (px) => {
        const state = { ...this.state }
        state.email.values.contentWidth = px;
        this.setState({ state });
    }

    /*=========================================
        Body Editor Method start
    ==========================================*/

    /*<!-------------- Break --------------->*/
    
    /*=========================================
        Email Editor Method start
    ==========================================*/

    showEditor = (editor) => {
        const state = { ...this.state }
        state.email.showEditor = editor;
        this.setState({ state });
    }

    /*=========================================
        Email Editor Method start
    ==========================================*/

    /*<!-------------- Break --------------->*/

    /*=========================================
        Row Editor Method start
    ==========================================*/

    // Remove Row
    removeRow = (index) => {
        const state = { ...this.state }
        state.email.rows = state.email.rows.filter((i, k) => k !== index);
        console.log(state.email.rows)
        this.setState({ state });
    }

    // Copy Row
    copyRow = (index) => {
        const cpRow = cloneDeep(this.state.email.rows[index]);
        const rowClone = Array.from(this.state.email.rows);
        rowClone.splice(index++ , 0, cpRow);
        const state = { ...this.state };
        state.email.rows = rowClone;
        this.setState({ state });
    }

    // Select Index which row will be edit
    editAbleRow = (index) => {
        const cloneRowIndex = this.state.email.rows[index];
        const state = { ...this.state };
        cloneRowIndex.key = index;
        state.email.editableRow = cloneRowIndex;
        this.setState({ state });
    }

    // Row Background Color Change
    rowBackgroundChange = (index, color) => {
        const state = { ...this.state };
        state.email.rows[index].values.backgroundColor = color;
        this.setState({ state });
    }

    // Row Background image changes
    rowBackgroundImagePropertyChange = (index, key, value) => {
        const sourceObj = Array.from(this.state.email.rows);
        sourceObj[index].values.backgroundImage[key] = value;
        const state = { ...this.state };
        this.setState({ state });
    }

    /*=========================================
        Body Editor Method End
    ==========================================*/

    /*<!-------------- Break --------------->*/

    /*=========================================
        Email JSON Object Method start
    ==========================================*/

    showingObject = () => {
        const { rows, values, showEditor, rowDraggingDisable, editableRow } = this.state.email;
        return { rows, values, showEditor, rowDraggingDisable, editableRow };
    }
    /*=========================================
        Email JSON Object Method End
    ==========================================*/

    /*<!-------------- Break --------------->*/


    

    render() {
        return(
            <div className="email-template-editor">
                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                    <Layout.Row>
                        <Layout.Col span="16">
                            <div className="sj-preview">
                                <Tabs type="border-card" activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
                                    <Tabs.Pane label="Design" name="1" className={`sj_email_preview`}>
                                        <EmailPreview
                                            email={this.state.email}
                                            showEditor={this.showEditor}
                                            editAbleRow={this.editAbleRow}
                                            removeRow={this.removeRow}
                                            copyRow={this.copyRow}
                                        />
                                    </Tabs.Pane>
                                    <Tabs.Pane label="JSON" name="2">
                                        <EmailJsonView
                                            email={this.showingObject()}
                                        ></EmailJsonView>
                                    </Tabs.Pane>
                                    <Tabs.Pane label="HTML" name="3">
                                        <EmailHtmlPreview 
                                            email={this.state.email}
                                        />
                                    </Tabs.Pane>
                                </Tabs>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="8">
                            <div className="sj-editor">
                                <EmailEditor
                                    email={this.state.email}
                                    changeBodyContentWidth={this.changeBodyContentWidth}
                                    changeDefaultRowHtmlID={this.changeDefaultRowHtmlID}
                                    showEditor={this.showEditor}
                                    rowBackgroundChange={this.rowBackgroundChange}
                                    rowBackgroundImage={this.rowBackgroundImagePropertyChange}
                                />
                            </div>
                        </Layout.Col>
                    </Layout.Row>
                </DragDropContext>
            </div>
        );
    }
}

export default EmailTemplateEditor;