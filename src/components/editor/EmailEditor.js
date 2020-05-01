import React, { Component } from 'react';
import EmailBody from './sub-components/EmailBody';
import EmailContent from './sub-components/EmailContent';
import EmailRow from './sub-components/EmailRow';

import RowEditor from './core-editor/RowEditor';

import {
    Layout,
    Tabs
} from 'element-react';

class EmailEditor extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    showTabs = () => {
        return (
            <Tabs 
                type="border-card" 
                activeName="1" 
                onTabClick={ (tab) => console.log(tab.props.name) }
            >
                <Tabs.Pane label="Content" name="1">
                    <EmailContent
                        defaultContent={this.props.email.defaultContent}
                        rowDraggingStatus={this.props.rowDraggingStatus}
                    />
                </Tabs.Pane>
                <Tabs.Pane label="Row" name="2">
                    <EmailRow
                        defaultRow={this.props.email.defaultRow}
                        changeDefaultRowHtmlID={this.props.changeDefaultRowHtmlID}
                    />        
                </Tabs.Pane>
                <Tabs.Pane label="Body" name="3">
                    <EmailBody
                        body={this.props.email}
                        changeBodyContentWidth={this.props.changeBodyContentWidth}
                    /> 
                </Tabs.Pane>
            </Tabs>
        )
    }

    showRowEditor = () => {
        return (
            <RowEditor
                showEditor={this.props.showEditor}
                editAbleRow={this.props.email.editableRow}
                rowBackgroundChange={this.props.rowBackgroundChange}
                rowBackgroundImage={this.props.rowBackgroundImage}
            />
        )
    }

    viewEditor = () => {
        const { showEditor } = this.props.email;
        console.log(showEditor, 'editr')
        if (showEditor === 'main_editor') {
            return this.showTabs();
        } else if( showEditor === 'row_editor') {
            return this.showRowEditor();
        }
    }

    render() {
        return(
            <div className="email-editor">
                {
                    this.viewEditor()
                }
            </div>
        );
    }
}

export default EmailEditor;