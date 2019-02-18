import BaseBlock,{IBaseProps} from './base/block'

class UnorderedList extends BaseBlock {
    static defaultProps: IBaseProps = {
        iconType: 'icon-unorderedlist',
        label: '无序列表'
    }
    type = 'unordered-list-item'
}

export default UnorderedList