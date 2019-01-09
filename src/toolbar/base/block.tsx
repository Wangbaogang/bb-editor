import React, { Component } from 'react'
import { RichUtils, EditorState } from 'draft-js'
import store from '../../store'

class Block extends Component {
    private type: string;
    private label: string;
    onClick = () => {
        console.log(this.type)
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