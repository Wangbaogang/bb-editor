import React = require("react")
import { RichUtils, EditorState } from 'draft-js'
import Store from '../../../store';
import { Tooltip } from 'antd'
import Icon from '../../../icon'
import Base, { IBaseProps } from './base';
import { observer } from 'mobx-react'
@observer class Block extends Base {
    defaultSetEditorState = () => {
        const store: Store = this.context
        const editorState: EditorState = RichUtils.toggleBlockType(store.editorState, this.type)
        const focusEditorState: EditorState = EditorState.forceSelection(editorState, editorState.getSelection())
        store.editorState = focusEditorState
    }

    render() {
        const store: Store = this.context
        const { editorState } = store
        const currentKey = editorState.getSelection().getAnchorKey()
        const currentBlock = editorState.getCurrentContent().getBlockForKey(currentKey)

        return <Tooltip placement="top" title={this.props.label}>
            <button className={"bb-editor-toolbtn" + (currentBlock.getType() === (this.type) ? ' active' : '')} onClick={this.onClick}>
                <Icon type={this.props.iconType} />
            </button>
        </Tooltip>
    }
}

export { IBaseProps }
export default Block