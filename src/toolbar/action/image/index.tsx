import BaseBlock from '../base/block'
import { ContentState, AtomicBlockUtils, EditorState } from 'draft-js'
import React from 'react'
import ReactDOM from 'react-dom'
import ImageUpload, { ImageProps } from './addImage'

let imageUploadInstance: HTMLElement
function creaetImageUpload(options: ImageProps) {
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
    static defaultProps: IBaseProps = {
        type: 'IMAGE',
        label: '图片',
        iconType: 'icon-image'
    }
    onClick = () => {
        creaetImageUpload({
            createImageBlock: this.createImageBlock.bind(this),
            /* this is an example for replace urls while server return */
            // replaceUrls: (fileList, response) => {
            //     console.log(fileList)
            //     return fileList.map((file: any) => {
            //         file.uploadUrl = 'https://www.baidu.com/img/baidu_jgylogo3.gif'
            //         return file
            //     })
            // }
        })
    }

    
    createImageBlock = (files: any) => {
        const store = this.context
        let editorState = store.editorState
        console.log(files)
        files.forEach((file:any):any => {
            const contentState: ContentState = editorState.getCurrentContent()
            const contentStateWithEnity = contentState.createEntity(
                'IMAGE',
                'IMMUTABLE',
                {
                    src: file.uploadUrl || file.thumbUrl // 'https://fanyi.bdstatic.com/static/translation/img/header/logo_cbfea26.png'
                }
            )
            const entityKey = contentStateWithEnity.getLastCreatedEntityKey()
            editorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
        });
        
        const focusEditorState = EditorState.forceSelection(editorState, editorState.getSelection())
        store.editorState = focusEditorState
    }
}

export default Image