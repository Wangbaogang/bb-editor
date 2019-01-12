import { observable } from 'mobx'
import { EditorState } from 'draft-js'

interface IStore {
    editorState: EditorState
}

class Store {
    @observable editorState: EditorState
    constructor(props: IStore) {
        this.editorState = props.editorState
    }
}

export default Store