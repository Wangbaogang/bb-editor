import BaseBlock from '../base/block'
import { ContentState, AtomicBlockUtils } from 'draft-js'
import React from 'react'
import ReactDOM from 'react-dom'
import store from '../../store'
import ImageUpload from './imageUpload'

let imageUploadInstance:any
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
    onClick = () => {
        creaetImageUpload({})
        // this.createImageBlock()
    }
    createImageBlock = () => {
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
    render() {
        this.setType("IMAGE")
        this.setLabel("image")
        return super.render()
    }
}

export default Image