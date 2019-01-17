import React = require("react")
import { Tooltip } from 'antd'
import Icon from '../../../icon'
import StoreContext from '../../../context/store'
import Store from '../../../store';
interface IBaseProps {
    iconType?: string
    label?: string,
    [propName: string]: any
}
abstract class Base extends React.Component<IBaseProps> {
    static contextType = StoreContext
    protected type: string
    onClick = () => {
        console.log(this.type)
        this.defaultSetEditorState()
    }

    abstract defaultSetEditorState(): void

    render() {
        const store: Store = this.context
        return <Tooltip placement="top" title={this.props.label}>
            <button className={"bb-editor-toolbtn" + (store.editorActiveButtons[this.type] ? ' active' : '')} onClick={this.onClick}>
                <Icon type={this.props.iconType} />
            </button>
        </Tooltip>
    }
}

export { IBaseProps }
export default Base