import React, { Component } from 'react';
import { 
    Collapse, 
    InputNumber,
    Select 
} from 'element-react';
import ColorPicker from 'rc-color-picker';

class EmailBody extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fontFamily: [
                {
                    label: "Arial",
                    value: "arial,helvetica,sans-serif",
                    type: "",
                    values: ""
                },
                {
                    label: "Andale Mono",
                    value: "andale mono,times",
                    type: "",
                    values: ""
                },
                {
                    label: "Arial Black",
                    value: "arial black,avant garde,arial",
                    type: "",
                    values: ""
                },
                {
                    label: "Book Antiqua",
                    value: "book antiqua,palatino",
                    type: "",
                    values: ""
                },
                {
                    label: "Cabin",
                    value: "'Cabin',sans-serif",
                    type: "google",
                    values: ""
                },
                {
                    label: "Comic Sans MS",
                    value: "comic sans ms,sans-serif",
                    type: "",
                    values: ""
                },
                {
                    label: "Courier New",
                    value: "courier new,courier",
                    type: "",
                    values: ""
                },
                {
                    label: "Crimson Text",
                    value: "'Crimson Text',serif",
                    type: "google",
                    values: "400,700"
                },
                {
                    label: "Georgia",
                    value: "georgia,palatino",
                    type: "",
                    values: ""
                },
                {
                    label: "Helvetica",
                    value: "helvetica,sans-serif",
                    type: "",
                    values: ""
                }
            ]
        }
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    render() {
        return(
            <div className="email-body">
                <Collapse value="1">
                    <Collapse.Item title="General Settings" name="1">
                        <div className="general-settings-wrapper">
                            <div className="settings-label">
                                Background Color
                            </div>
                            <div className="settings-item">
                                <ColorPicker color={this.props.body.values.backgroundColor}>
                                    <div className="react-custom-trigger"></div>
                                </ColorPicker>
                            </div>
                        </div>

                        <div className="general-settings-wrapper">
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
                        </div>

                        <div className="general-settings-wrapper">
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
                        </div>

                    </Collapse.Item>
                </Collapse>
            </div>
        );
    }
}

export default EmailBody;