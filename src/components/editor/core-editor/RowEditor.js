import React, { Component } from 'react';
import { Collapse, Button, Input, Form, Switch } from 'element-react';
import ColorPicker from 'rc-color-picker';

class RowEditor extends Component {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    showGeneralEditForm = () => {
        const { key, values: { backgroundColor, backgroundImage: { url } } } = this.props.editAbleRow;
        return (
            <div className="row-general-edit-form">
                <div className="general-settings-wrapper">
                    <div className="settings-label">
                        Background Color
                    </div>
                    <div className="settings-item">
                        <ColorPicker color={backgroundColor} onChange={(e) => this.props.rowBackgroundChange(key, e.color)}>
                            <div className="react-custom-trigger"></div>
                        </ColorPicker>
                    </div>
                </div>

                <div className="general-settings-wrapper">
                    <Form
                        className="en-US"
                        labelWidth="120"
                    >
                        <Form.Item
                            label="Backgroundd URL"
                        >
                            <Input value={url} />
                        </Form.Item>
                        
                        <Form.Item
                            className="background-image"
                            label="Full Width"
                        >
                            <Switch
                                value={true}
                                onChange = { (e) => console.log(e) }
                            />
                        </Form.Item>
                        <Form.Item
                            className="background-image"
                            label="Repeat"
                        >
                            <Switch
                                value={true}
                            />
                        </Form.Item>
                        <Form.Item
                            className="background-image"
                            label="Center"
                        >
                            <Switch
                                value={true}
                            />
                        </Form.Item>
                    </Form>
                </div>

                {/* <div className="general-settings-wrapper">
                    <div className="settings-label">
                        Content Width
                    </div>
                    <div className="settings-item">
                        <InputNumber 
                            size="small" 
                            defaultValue={this.props.body.values.contentWidth}
                            onChange={this.props.changeBodyContentWidth}
                        />
                    </div>
                </div> */}

                {/* <div className="general-settings-wrapper">
                    <div className="settings-label">
                        Font Family
                    </div>
                    <div className="settings-item">
                        <Select>
                            {
                                this.state.fontFamily.map((font, key) => {
                                    return (
                                        <Select.Option key={key} value={font} label={font.label}/>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </div> */}
            </div>
        )
    }

    render() {
        return(
            <div className="row-editor">
                <div className="row-editor-header">
                    <div>
                        <h5
                            style={{
                                marginRight: "276px",
                                marginTop: "6px"
                            }}
                        >
                            Row
                        </h5>
                    </div>
                    <div>
                        <Button
                            plain={true}
                            type="info"
                            icon="close"
                            size="mini"
                            className="pull-right"
                            onClick={() => {
                                this.props.showEditor('main_editor')
                            }}
                        >
                        </Button>
                    </div>  
                </div>

                <div
                    className="row-editor-content"
                >
                    <Collapse>
                        <Collapse.Item title="General" name="1">
                            {
                                this.showGeneralEditForm()
                            }
                        </Collapse.Item>
                    </Collapse>
                </div>
            </div>
        )
    }

}

export default RowEditor;