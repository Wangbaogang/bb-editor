import React, { Component } from 'react';
import './toolbar.less'
import Action from './action'
import Divider from './divider'
interface IToolbarProps {
    style?: object
}

class Toolbar extends Component<IToolbarProps> {
    static Action = Action
    static Divider = Divider
    
    render() {
        return <div className="bb-editor-toolbar" style={this.props.style}>
            {this.props.children}
        </div>
    }
}

export default Toolbar