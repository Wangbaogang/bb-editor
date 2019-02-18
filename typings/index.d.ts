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

        export namespace Action {
            export class Bold extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class Italic extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class UnderLine extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class Header extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class OrderedList extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class UnorderedList extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class CodeBlock extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class Blockquote extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class Divider extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class Link extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class Image extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
            export class StrikeThrough extends React.Component<IBaseProps> { 
                constructor(props: IBaseProps)
            }
        }

        export interface IAction {
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

        export class ToolBar extends React.Component {
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
