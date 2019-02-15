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
            class Bold extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class Italic extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class UnderLine extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class Header extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class OrderedList extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class UnorderedList extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class CodeBlock extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class Blockquote extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class Divider extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class Link extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class Image extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            class StrikeThrough extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
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

