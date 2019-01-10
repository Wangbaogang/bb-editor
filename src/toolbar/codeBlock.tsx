import BaseBlock from './base/block'

class Header extends BaseBlock {
    static defaultProps: IBaseProps = {
        iconType: 'icon-code',
        label: '代码'
    }
    type = 'code-block'
}

export default Header