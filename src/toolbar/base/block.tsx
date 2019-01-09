import React, { Component } from 'react'
import { RichUtils, EditorState } from 'draft-js'
import StoreContext from '../../context/store'

class Block extends Component {
    static contextType = StoreContext
    private type: string;
    private label: string;
    onClick = () => {
        console.log(this.type)
        const store = this.context
        const editorState: EditorState = RichUtils.toggleBlockType(store.editorState, this.type)
        const focusEditorState: EditorState = EditorState.forceSelection(editorState, editorState.getSelection())
        store.editorState = focusEditorState
    }
    render() {
        return <span onClick={this.onClick}>{this.label}</span>
    }
    setType(type: string) {
        this.type = type
    }
    setLabel(label: string) {
        this.label = label
    }
}

export default Block