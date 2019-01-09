import { observable } from 'mobx'
import { EditorState , CompositeDecorator} from 'draft-js'
import { Divider, Link } from '../decorators'

class Store {
    @observable editorState: EditorState = EditorState.createEmpty(new CompositeDecorator(
        [
            new Divider(),
            new Link()
        ]
    ))
}

export default Store