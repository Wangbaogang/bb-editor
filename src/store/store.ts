import { observable } from 'mobx'
import { EditorState } from 'draft-js'

class Store {
    @observable editorState: EditorState
    constructor(props: any) {
        this.editorState = props.editorState
    }
}

export default Store