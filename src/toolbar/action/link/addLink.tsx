import { Form, Input, Modal } from 'antd'
import React = require("react")
import { EditorState, RichUtils, Modifier, SelectionState, CharacterMetadata } from 'draft-js'
interface IlinkProps {
    label: string
    href: string
    entityKey?: string,
    store: any
}
export default class LinkFormModal extends React.Component<IlinkProps> {
    state = {
        href: this.props.href,
        label: this.props.label,
        visible: true,
    }
    setLabel = (event: any) => {
        const { value } = event.target
        this.setState({
            label: value
        })
    }
    setHref = (event: any) => {
        const { value } = event.target

        this.setState({
            href: value
        })
    }
    hideModal = () => {
        this.setState({
            visible: false
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleCancel = () => {
        this.hideModal()
    }

    createLink(options: IlinkProps) {
        const { href, label, entityKey, store } = options
        let editorState: EditorState = store.editorState
        const contentState = editorState.getCurrentContent()
        let selectionState = editorState.getSelection()
        if (entityKey) {
            // contentState = contentState.replaceEntityData(
            //     entityKey,
            //     {
            //         href,
            //         label
            //     }
            // )
            // console.log(href, label)
            // selectionState = contentState.getSelectionAfter()
            // editorState = EditorState.set(editorState, {
            //     currentContent: contentState,
            //     selection: selectionState
            // })
            // store.editorState = editorState
            // return;
            const blockKey = selectionState.getAnchorKey()
            const block = contentState.getBlockForKey(blockKey)
            block.findEntityRanges((character: CharacterMetadata) => {
                const cEntityKey = character.getEntity()
                return cEntityKey === entityKey
            }, (...range) => {
                if (range.length === 2) {
                    selectionState = selectionState.merge({
                        anchorOffset: range[0],
                        focusOffset: range[1]
                    }) as SelectionState
                    editorState = EditorState.acceptSelection(editorState, selectionState)
                    // editorState = RichUtils.toggleLink(editorState, selectionState, null)
                    // editorState = EditorState.set(
                    //     editorState,
                    //     {
                    //         currentContent: Modifier.removeRange(contentState, selectionState, 'forward')
                    //     }
                    // )
                    // editorState = EditorState.push(editorState, Modifier.removeRange(editorState.getCurrentContent(), editorState.getSelection(), 'forward'), 'remove-range')
                    editorState = EditorState.push(editorState, Modifier.removeRange(editorState.getCurrentContent(), editorState.getSelection(), 'forward'), 'remove-range')
                }
            })
        }
        /* 合并选区 */
        selectionState = editorState.getSelection()
        const focusOffset = selectionState.getFocusOffset()
        const selectionStateCollapsed = selectionState.merge({
            anchorOffset: focusOffset,
            focusOffset
        }) as SelectionState
        const editorStateCollapsed = EditorState.acceptSelection(editorState, selectionStateCollapsed)

        /* 插入文字 */
        const focusOffsetWidthLength = focusOffset + label.length
        const contentStateWithText = Modifier.insertText(editorState.getCurrentContent(), selectionStateCollapsed, label)

        const editorStateAfterInsertText = EditorState.set(editorStateCollapsed, {
            currentContent: contentStateWithText,
        })

        /* 创建实体 */
        const contentStateWithEntity = contentStateWithText.createEntity(
            "LINK",
            "MUTABLE",
            {
                href,
                label
            }
        )
        const newEntityKey = contentStateWithEntity.getLastCreatedEntityKey()

        /* 选区覆盖文字 */
        const selectitonStateCovered = selectionStateCollapsed.merge({
            anchorOffset: focusOffset,
            focusOffset: focusOffsetWidthLength
        }) as SelectionState

        const newEditorState = EditorState.set(editorStateAfterInsertText, {
            currentContent: contentStateWithEntity,
            selection: selectitonStateCovered
        })

        /* 转换为链接 */
        const editorStateWithLink = RichUtils.toggleLink(newEditorState, selectitonStateCovered, newEntityKey)
        /* 合并选区 */
        const selectionStateEnd = selectitonStateCovered.merge({
            anchorOffset: focusOffsetWidthLength,
        }) as SelectionState
        const lastedEditorState = EditorState.forceSelection(editorStateWithLink, selectionStateEnd)
        this.props.store.editorState = lastedEditorState

    }

    handleOk = () => {
        this.hideModal()
        this.createLink({
            entityKey: this.props.entityKey,
            href: this.state.href,
            label: this.state.label,
            store: this.props.store
        })
    }
    render() {
        return <Modal
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onOk={this.handleOk}>
            <Form>
                <Form.Item label="文字">
                    <Input defaultValue={this.state.label} onChange={this.setLabel} />
                </Form.Item>
                <Form.Item label="链接地址">
                    <Input defaultValue={this.state.href} onChange={this.setHref} />
                </Form.Item>
            </Form>
        </Modal>
    }
}