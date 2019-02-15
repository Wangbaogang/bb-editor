declare module 'bb-editor' {
    import draftjs = require('draft-js')
    import React = require('react')

    namespace BBEditor {
        interface IEditorProps {
            value: draftjs.EditorState
            contentStyle?: object
            style?: object
            afterChange?: (editorState: draftjs.EditorState) => void
        }
        class Editor extends React.Component<IEditorProps>{
            constructor(props: IEditorProps)
            store: object
            editor: draftjs.Editor
        }
        function EditorStateGenerator(content?: draftjs.RawDraftContentState | draftjs.ContentState | null): draftjs.EditorState

        interface IBaseProps {
            iconType?: string
            label?: string,
            [propName: string]: any
        }

        namespace Action {
            class Bold extends React.Component { }
            class Italic extends React.Component { }
            class UnderLine extends React.Component { }
            class Header extends React.Component { }
            class OrderedList extends React.Component { }
            class UnorderedList extends React.Component { }
            class CodeBlock extends React.Component { }
            class Blockquote extends React.Component { }
            class Divider extends React.Component { }
            class Link extends React.Component { }
            class Image extends React.Component { }
            class StrikeThrough extends React.Component { }
        }

        interface IAction {
            Bold: Action.Bold
            Italic: Action.Italic
            UnderLine: Action.UnderLine
            Header: Action.Header
            OrderedList: Action.OrderedList
            UnorderedList: Action.UnorderedList
            CodeBlock: Action.CodeBlock
            Blockquote: Action.Blockquote
            Divider: Action.Divider
            Link: Action.Link
            Image: Action.Image
            StrikeThrough: Action.StrikeThrough
        }

        class ToolBar extends React.Component {
            static Action: IAction
        }
    }

    import Editor = BBEditor.Editor
    import ToolBar = BBEditor.ToolBar
    import EditorStateGenerator = BBEditor.EditorStateGenerator

    export {
        Editor, ToolBar, EditorStateGenerator
    }
}

