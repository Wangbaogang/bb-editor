import React = require('react');
import {
    Editor as DraftEditor,
    EditorState,
    RichUtils,
    DraftHandleValue,
    RawDraftContentState,
    ContentState,
    CompositeDecorator,
    convertFromRaw,
    ContentBlock,
} from 'draft-js'
import ToolBar from './toolbar'
import Store from './store'
import StoreContext from './context/store'
import Atomic from './atomic'
import { Link as LinkDecorator } from './decorators'
import 'draft-js/dist/Draft.css'
import 'antd/dist/antd.css';
import 'normalize.css'
import { autorun } from 'mobx';

export { ToolBar }
export { Editor }
export { EditorStateGenerator }
export { IEditorProps }
function EditorStateGenerator(content?: RawDraftContentState | ContentState | null): EditorState {
    const decorators = new CompositeDecorator(
        [
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

function AtomicElement(props: any): any {
    const { block, contentState } = props
    const entity = contentState.getEntity(block.getEntityAt(0))
    const data = entity.getData()
    const type = entity.getType()
    if (type === 'IMAGE') {
        return Atomic.getImage(data)
    }
    return Atomic.getDivider()
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

interface IEditorProps {
    value: EditorState,
    contentStyle?: object,
    style?: object,
    afterChange?: (editorState: EditorState) => void
}
class Editor extends React.Component<IEditorProps> {
    store = new Store({
        editorState: this.props.value,
        editorActiveButtons: []
    })
    editor: DraftEditor

    constructor(props: IEditorProps) {
        super(props)
        console.log(this.props.children)
        autorun(() => {
            this.afterChange(this.store.editorState)
        })
    }

    afterChange(editorState: EditorState) {
        if (this.props.afterChange) {
            this.props.afterChange(editorState)
        }
    }

    onChange = (editorState: EditorState): void => {
        this.store.editorState = editorState
    }

    focusEditor = () => {
        if(this.editor) {
            this.editor.focus()
        }
    }

    setEditor = (element: any) => {
        this.editor = element
    }

    handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
        // const contentState = editorState.getCurrentContent()
        // const selectionState = editorState.getSelection()
        // const blockKey = selectionState.getFocusKey()
        console.log(command, 'command')
        /* trick for backspace in divider block */
        // if (command === 'backspace') {
        //     const block = contentState.getBlockForKey(blockKey)
        //     const entityKey = block.getEntityAt(0)

        //     if (entityKey && contentState.getEntity(entityKey).getType() === 'DIVIDER') {
        //         const contentStateWithoutDivider = Modifier.removeRange(contentState, selectionState, 'backward')
        //         editorState = EditorState.push(editorState, contentStateWithoutDivider, 'remove-range')
        //     }
        // }
        const newEditorState = RichUtils.handleKeyCommand(editorState, command)
        if (newEditorState) {
            this.onChange(newEditorState)
            return 'handled'
        }
        return 'not-handled'
    }

    render(): JSX.Element {
        return <StoreContext.Provider value={this.store}>
            <div className="bb-editor" style={this.props.style}>
                {this.props.children}
                <div
                    className="bb-editor-content"
                    style={this.props.contentStyle}
                    onClick={this.focusEditor}>
                    <DraftEditor
                        ref={this.setEditor}
                        editorState={this.store.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        blockRendererFn={blockRendererFn}
                    />
                </div>
            </div>
        </StoreContext.Provider>
    }
}
