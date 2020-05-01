import React, { Component } from 'react';
import ReactJsonView from 'react-json-view';

class EmailJsonView extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.props = props;
    }

    render() {
        return(
            <div className="react-json-view">
                <ReactJsonView 
                    src={this.props.email}
                />
            </div>
        )
    }
}

export default EmailJsonView;