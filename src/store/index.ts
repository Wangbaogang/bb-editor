import { observable } from 'mobx'
import { EditorState } from 'draft-js'

interface IStore {
    editorState: EditorState,
    editorActiveButtons: object
}

class Store {
    @observable editorState: EditorState
    @observable editorActiveButtons: {
        [propName: string]: boolean
    }
    constructor(props: IStore) {
        this.editorState = props.editorState
        this.editorActiveButtons = {}
    }
}

export default Store