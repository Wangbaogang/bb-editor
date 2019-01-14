import BaseBlock from './base/block'

class Blockquote extends BaseBlock {
    static defaultProps: IBaseProps = {
        iconType: 'icon-blockquote',
        label: '引用',
    }
    type = 'blockquote'
}

export default Blockquote