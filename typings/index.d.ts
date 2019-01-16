declare module 'bb-editor' {
    import draftjs = require('draft-js')
    export {
        Editor,
        EditorStateGenerator,
        IEditorProps,
        ToolBar
    }
    class Editor extends React.Component<IEditorProps>{
        constructor(props: IEditorProps)
        store: object
        editor: draftjs.Editor
    }
    function EditorStateGenerator(content?: draftjs.RawDraftContentState | draftjs.ContentState | null): draftjs.EditorState
    interface IEditorProps {
            value: draftjs.EditorState
            contentStyle?: object
            style?: object
            afterChange?: (editorState: draftjs.EditorState) => void
    }

    namespace ToolBar {
        namespace Action {
            class  Bold {}
            class Italic {}
            class UnderLine {}
            class Header {}
            class OrderedList {}
            class UnorderedList {}
            class CodeBlock {}
            class Blockquote {}
            class Divider {}
            class Link {}
            class Image {}
            class StrikeThrough {}
        }
    }
}