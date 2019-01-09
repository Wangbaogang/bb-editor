import BaseBlock from './base/block'
import { ContentState, AtomicBlockUtils } from 'draft-js'
import store from '../store'

class Divider extends BaseBlock {
    onClick = () => {
        const { editorState } = store
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity: ContentState = contentState.createEntity(
            "DIVIDER",
            "IMMUTABLE"
        )

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const editorStateWidthDividerBlock = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')

        store.editorState = editorStateWidthDividerBlock
    }
    render() {
        this.setType("DIVIDER")
        this.setLabel("divider")
        return super.render()
    }
}

export default Divider