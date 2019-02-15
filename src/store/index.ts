import { observable } from 'mobx'
import { EditorState } from 'draft-js'

interface IStore {
    editorState: EditorState,
    editorActiveButtons: string[]
}

class Store {
    @observable editorState: EditorState
    @observable editorActiveButtons: string[]
    constructor(props: IStore) {
        this.editorState = props.editorState
        this.editorActiveButtons = props.editorActiveButtons
    }
}

export default Store