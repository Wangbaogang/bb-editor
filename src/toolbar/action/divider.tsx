import BaseBlock,{IBaseProps} from './base/block'
import { ContentState, AtomicBlockUtils } from 'draft-js'

class Divider extends BaseBlock {
    static defaultProps: IBaseProps = {
        iconType: 'icon-hr',
        label: '分割线'
    }
    type = 'DIVIDER'
    onClick = () => {
        const store = this.context
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
}

export default Divider