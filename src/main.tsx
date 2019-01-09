import * as React from 'react';
import { observer } from 'mobx-react'
import {
    Editor as DraftEditor,
    EditorState,
    RichUtils,
    DraftHandleValue,
    Modifier,
    ContentBlock,
} from 'draft-js'
import Toolbar from './toolbar'
import store from '../src/store'
import 'draft-js/dist/Draft.css'
import 'antd/dist/antd.css';

export { Toolbar }
export { Editor }

function Image (props: any): any {
    return <img src={props.src} />
}

function AtomicElement(props: any): any {
    const { block, contentState } = props
    const entity = contentState.getEntity(block.getEntityAt(0))
    const data = entity.getData()
    const type = entity.getType()
    if (type === 'IMAGE') {
        return <Image src={data.src} />
    }
}

function blockRendererFn(block: ContentBlock): any {
    const type = block.getType()
    if (type === 'atomic') {
        return {
            component: AtomicElement,
            editable: false
        }
    }
}
@observer class Editor extends React.Component<React.Props<any>> {
    onChange = (editorState: EditorState): void => {
        console.log(editorState, 'onChange')
        store.editorState = editorState
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
        return <div className="bb-editor">
            {this.props.children}
            <DraftEditor
                editorState={store.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                blockRendererFn={blockRendererFn} />
        </div>
    }
}
