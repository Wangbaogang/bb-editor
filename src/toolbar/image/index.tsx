import BaseBlock from '../base/block'
import { ContentState, AtomicBlockUtils, EditorState } from 'draft-js'
import React from 'react'
import ReactDOM from 'react-dom'
import ImageUpload from './addImage'
import StoreContext from '../../context/store'

let imageUploadInstance: any
function creaetImageUpload(options: any) {
    if (imageUploadInstance) { imageUploadInstance.remove() }
    const div = document.createElement('div')
    document.body.appendChild(div)
    const element = React.createElement(
        ImageUpload,
        options,
        div
    )
    ReactDOM.render(element, div)
    imageUploadInstance = div
    return imageUploadInstance
}
class Image extends BaseBlock {
    static contextType = StoreContext
    static defaultProps: IBaseProps = {
        type: 'IMAGE',
        label: '图片',
        iconType: 'icon-image'
    }
    onClick = () => {
        creaetImageUpload({
            createImageBlock: this.createImageBlock.bind(this)
        })
    }
    createImageBlock = (options: any) => {
        const store = this.context
        const contentState: ContentState = store.editorState.getCurrentContent()
        const contentStateWithEnity = contentState.createEntity(
            'IMAGE',
            'IMMUTABLE',
            {
                src: options.src // 'https://fanyi.bdstatic.com/static/translation/img/header/logo_cbfea26.png'
            }
        )
        const entityKey = contentStateWithEnity.getLastCreatedEntityKey()
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(store.editorState, entityKey, ' ')
        const focusEditorState = EditorState.forceSelection(newEditorState, newEditorState.getSelection())
        store.editorState = focusEditorState
    }
}

export default Image