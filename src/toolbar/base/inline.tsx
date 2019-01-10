/// <reference path="./base.tsx" />

import React, { Component } from 'react'
import { RichUtils, EditorState } from 'draft-js'
import { Tooltip } from 'antd';
import StoreContext from '../../context/store'
import Icon from '../../icon'
class Inline extends Component<IBaseProps> {
    static contextType = StoreContext
    protected type: string

    onClick = () => {
        console.log(this.type)
        const store = this.context
        const editorState: EditorState = RichUtils.toggleInlineStyle(store.editorState, this.type)
        const focusEditorState: EditorState = EditorState.forceSelection(editorState, editorState.getSelection())
        store.editorState = focusEditorState
    }
    render() {
        return <Tooltip placement="top" title={this.props.label}>
            <button className="bb-editor-toolbtn" onClick={this.onClick} >
                <Icon type={this.props.iconType} />
            </button>
        </Tooltip>
    }
}


export default Inline