// Type definitions for bb-editor
// Project: https://github.com/Wangbaogang/bb-editor
// Definitions by: wangbg https://github.com/Wangbaogang

declare module 'bb-editor' {
    import draftjs = require('draft-js')
    import React = require('react')




    namespace BBEditor {
        export interface IEditorProps {
            value: draftjs.EditorState
            contentStyle?: object
            style?: object
            afterChange?: (editorState: draftjs.EditorState) => void
        }
        export class Editor extends React.Component<IEditorProps>{
            constructor(props: IEditorProps)
            store: object
            editor: draftjs.Editor
        }
        export function EditorStateGenerator(content?: draftjs.RawDraftContentState | draftjs.ContentState | null): draftjs.EditorState

        export interface IBaseProps {
            iconType?: string
            label?: string,
            [propName: string]: any
        }

        export class ButtonBase extends React.Component {

        }

        export interface Buttons {
            Bold: typeof ButtonBase
            Italic: typeof ButtonBase
            UnderLine: typeof ButtonBase
            Header: typeof ButtonBase
            OrderedList: typeof ButtonBase
            UnorderedList: typeof ButtonBase
            CodeBlock: typeof ButtonBase
            Blockquote: typeof ButtonBase
            Divider: typeof ButtonBase
            Link: typeof ButtonBase
            Image: typeof ButtonBase
            StrikeThrough: typeof ButtonBase
        }

        export class Divider extends React.Component {

        }

        export class ToolBar extends React.Component {
            static Buttons: Buttons
            static Divider: typeof Divider
        }
    }

    import Editor = BBEditor.Editor
    import ToolBar = BBEditor.ToolBar
    import EditorStateGenerator = BBEditor.EditorStateGenerator

    export {
        Editor, ToolBar, EditorStateGenerator
    }
}
