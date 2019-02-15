import React = require("react")
import { RichUtils, EditorState, SelectionState } from 'draft-js'
import { observer } from 'mobx-react'
import Store from '../../../store';
import { Tooltip } from 'antd'
import Icon from '../../../icon'
import Base, { IBaseProps } from './base';
@observer class Inline extends Base {

    defaultSetEditorState = () => {
        const store: Store = this.context
        const { editorState } = store
        const originSelection = editorState.getSelection()
        const currentKey = originSelection.getAnchorKey()
        // const currentBlock = editorState.getCurrentContent().getBlockForKey(currentKey)
        const selectionState = SelectionState.createEmpty(currentKey)
        const entireBlockSelectionState = selectionState.merge({
            anchorOffset: originSelection.getAnchorOffset(),
            focusOffset: originSelection.getFocusOffset()
        }) as SelectionState;
        const focusEditorState: EditorState = EditorState.forceSelection(editorState, entireBlockSelectionState)
        const newEditorState: EditorState = RichUtils.toggleInlineStyle(focusEditorState, this.type)
        store.editorState = newEditorState
    }

    render() {
        const store: Store = this.context
        return <Tooltip placement="top" title={this.props.label}>
            <button className={"bb-editor-toolbtn" + (store.editorState.getCurrentInlineStyle().has(this.type) ? ' active' : '')} onClick={this.onClick}>
                <Icon type={this.props.iconType} />
            </button>
        </Tooltip>
    }
}

export { IBaseProps }
export default Inline