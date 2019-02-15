import React = require("react")
import StoreContext from '../../../context/store'
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
}

export { IBaseProps }
export default Base