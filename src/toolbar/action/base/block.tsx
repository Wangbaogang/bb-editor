import { RichUtils, EditorState } from 'draft-js'
import Store from '../../../store';
import Base, { IBaseProps } from './base';
import {observer} from 'mobx-react'
@observer class Block extends Base {
    defaultSetEditorState = () => {
        const store: Store = this.context
        const editorState: EditorState = RichUtils.toggleBlockType(store.editorState, this.type)
        const focusEditorState: EditorState = EditorState.forceSelection(editorState, editorState.getSelection())
        store.editorState = focusEditorState
    }
}

export { IBaseProps }
export default Block