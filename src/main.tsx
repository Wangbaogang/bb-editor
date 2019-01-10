import * as React from 'react';
import { observer } from 'mobx-react'
import {
    Editor as DraftEditor,
    EditorState,
    RichUtils,
    DraftHandleValue,
    Modifier,
    RawDraftContentState,
    ContentState,
    CompositeDecorator,
    convertFromRaw
    // ContentBlock,
} from 'draft-js'
import Toolbar from './toolbar'
import createStore from '../src/store'
import StoreContext from '../src/context/store'
import { Divider as DividerDecorator, Link as LinkDecorator } from '../src/decorators'
import 'draft-js/dist/Draft.css'
import 'antd/dist/antd.css';
import 'normalize.css'

export { Toolbar }
export { Editor }
export { EditorStateGenerator }
export { IEditorProps }
function EditorStateGenerator(content: RawDraftContentState | ContentState | null | undefined): EditorState {
    const decorators = new CompositeDecorator(
        [
            new DividerDecorator(),
            new LinkDecorator()
        ]
    )
    if (!content) {
        return EditorState.createEmpty(decorators)
    }
    return EditorState.createWithContent(
        content instanceof ContentState
            ?
            content
            :
            convertFromRaw(content),
        decorators
    )
}
// function Image(props: any): any {
//     return <img src={props.src} />
// }

// function AtomicElement(props: any): any {
//     const { block, contentState } = props
//     const entity = contentState.getEntity(block.getEntityAt(0))
//     const data = entity.getData()
//     const type = entity.getType()
//     if (type === 'IMAGE') {
//         return <Image src={data.src} />
//     }
// }

// function blockRendererFn(block: ContentBlock): any {
//     const type = block.getType()
//     if (type === 'atomic') {
//         return {
//             component: AtomicElement,
//             editable: false
//         }
//     }
// }

interface IEditorProps {
    value: EditorState,
    onChange?: (editorState: EditorState) => any
}
@observer class Editor extends React.Component<IEditorProps> {
    store = createStore({
        editorState: this.props.value
    })

    onChange = (editorState: EditorState): void => {
        console.log(editorState, 'onChange')
        this.store.editorState = editorState
        if (this.props.onChange) {
            this.props.onChange(editorState)
        }
    }

    handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
        const contentState = editorState.getCurrentContent()
        const selectionState = editorState.getSelection()
        const blockKey = selectionState.getFocusKey()
        console.log(command, 'command')
        /* trick for backspace in divider block */
        if (command === 'backspace') {
            const block = contentState.getBlockForKey(blockKey)
            const entityKey = block.getEntityAt(0)

            if (entityKey && contentState.getEntity(entityKey).getType() === 'DIVIDER') {
                const contentStateWithoutDivider = Modifier.removeRange(contentState, selectionState, 'backward')
                editorState = EditorState.push(editorState, contentStateWithoutDivider, 'remove-range')
            }
        }
        const newEditorState = RichUtils.handleKeyCommand(editorState, command)
        if (newEditorState) {
            this.onChange(newEditorState)
            return 'handled'
        }
        return 'not-handled'
    }

    render(): JSX.Element {
        return <StoreContext.Provider value={this.store}>
            <div className="bb-editor">
                {this.props.children}
                <DraftEditor
                    editorState={this.store.editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                // blockRendererFn={blockRendererFn} 
                />
            </div>
        </StoreContext.Provider>

    }
}
