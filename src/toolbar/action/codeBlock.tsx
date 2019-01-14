import BaseBlock from './base/block'
import { EditorState, Modifier } from 'draft-js';

class Header extends BaseBlock {
    static defaultProps: IBaseProps = {
        iconType: 'icon-code',
        label: '代码'
    }
    type = 'code-block'

    onClick = () => {
        const store = this.context
        const editorState:EditorState = store.editorState
        const selection = editorState.getSelection()
        const contentState = editorState.getCurrentContent()
        const blockKey = selection.getFocusKey()
        /* 若在文末设置为代码块样式，trick使得代码块后面有文本 */
        const contentBlock = contentState.getBlockForKey(blockKey)
        if(contentBlock.getType() !== this.type && contentState.getLastBlock() === contentBlock) {
            const newContentState = Modifier.splitBlock(contentState, selection)

            const newEditorState = EditorState.set(editorState, {
                currentContent: newContentState,
                selection: newContentState.getSelectionBefore()
            })
            store.editorState = newEditorState
        }
        
        this.defaultSetEditorState()
    }
}

export default Header