import BaseBlock from '../base/block'
import { ContentState, AtomicBlockUtils } from 'draft-js'
import React from 'react'
import ReactDOM from 'react-dom'
import ImageUpload from './imageUpload'
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
        creaetImageUpload({})
        // this.createImageBlock()
    }
    createImageBlock = () => {
        const store = this.context
        const { editorState } = store
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity: ContentState = contentState.createEntity(
            "IMAGE",
            "IMMUTABLE",
            {
                src: 'a.jpg'
            }
        )

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const editorStateWithImage = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')

        store.editorState = editorStateWithImage
    }
}

export default Image