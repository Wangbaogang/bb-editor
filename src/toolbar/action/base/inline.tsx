import * as React from 'react'
import { RichUtils, EditorState } from 'draft-js'
import { Tooltip } from 'antd';
import StoreContext from '../../../context/store'
import Icon from '../../../icon'
import IBaseProps from './base'
class Inline extends React.Component<IBaseProps> {
    static contextType = StoreContext
    protected type: string

    onClick = () => {
        console.log(this.type)
        this.defaultSetEditorState()
    }
    defaultSetEditorState = () => {
        const store = this.context
        const editorState: EditorState = RichUtils.toggleBlockType(store.editorState, this.type)
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

export {IBaseProps}
export default Inline