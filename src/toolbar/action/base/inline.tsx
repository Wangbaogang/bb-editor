import { RichUtils, EditorState } from 'draft-js'
import {observer} from 'mobx-react'
import Store from '../../../store';
import Base, { IBaseProps } from './base';
@observer class Inline extends Base {

    defaultSetEditorState = () => {
        const store: Store = this.context
        const editorState: EditorState = RichUtils.toggleInlineStyle(store.editorState, this.type)
        const focusEditorState: EditorState = EditorState.forceSelection(editorState, editorState.getSelection())
        store.editorState = focusEditorState
    }
}

export { IBaseProps }
export default Inline