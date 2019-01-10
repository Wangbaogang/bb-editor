import { EditorState, CharacterMetadata } from 'draft-js'
import ReactDOM from 'react-dom'
import React from 'react'
import BaseBlock from '../base/block'
import LinkFormModal from './formModal'
import StoreContext from '../../context/store'

let modalInstance: HTMLElement;
function createModalAndForm(options: any) {
    if (modalInstance) { modalInstance.remove() }
    const div = document.createElement('div')
    document.body.appendChild(div)
    const element = React.createElement(
        LinkFormModal,
        options,
        div
    )
    ReactDOM.render(element, div)
    modalInstance = div
    return modalInstance
}

class Divider extends BaseBlock {
    static defaultProps: IBaseProps = {
        type: 'LINK',
        label: '链接',
        iconType: 'icon-link'
    }
    static contextType = StoreContext
    onClick = () => {
        createModalAndForm(this.getLinkInfo())
    }
    getLinkInfo() {
        const store = this.context
        const editorState: EditorState = store.editorState
        const contentState = editorState.getCurrentContent()
        const selectionState = editorState.getSelection()
        const blockKey = selectionState.getAnchorKey()
        let linkEntityKey: any = null
        let linkIsFocus: boolean = false;
        let entityData: any;
        if (blockKey) {
            const block = contentState.getBlockForKey(blockKey)
            block.findEntityRanges((character: CharacterMetadata) => {
                const entityKey = character.getEntity()
                if (entityKey !== null) {
                    const entity = contentState.getEntity(entityKey)
                    const type = entity.getType()
                    if (type === 'LINK') {
                        if (!linkIsFocus) {
                            linkEntityKey = entityKey
                            entityData = entity.getData()
                        }
                        return true
                    }
                }
                return false
            }, (...range) => {
                if (range.length === 2) {
                    const [start, end] = range;
                    const focusOffset = selectionState.getFocusOffset()
                    const anchorOffset = selectionState.getAnchorOffset()
                    /* 当光标所处位置在range中时，才判定为是链接实体所在位置 */
                    if ((end >= anchorOffset && anchorOffset >= start) && (end >= focusOffset && focusOffset >= start)) {
                        linkIsFocus = true
                    }
                }
            })
        }
        return linkIsFocus ? { entityKey: linkEntityKey, ...entityData, store } : {
            href: '',
            label: '',
            store
        }
    }
}

export default Divider