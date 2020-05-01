import React, { Component } from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';

class EmailHtmlPreview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="email-html-preview">
                <CodeMirror
                    value='<h1>I ♥ react-codemirror2</h1>'
                    options={{
                        mode: 'xml',
                        theme: 'xq-light',
                        lineNumbers: true
                    }}
                    onChange={(editor, data, value) => {
                    }}
                />
            </div>
        );
    }
}

export default EmailHtmlPreview;