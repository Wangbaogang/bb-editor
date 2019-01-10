import BaseBlock from './base/block'

class OrderedList extends BaseBlock {
    static defaultProps: IBaseProps = {
        iconType: 'icon-orderedlist',
        label: '有序列表'
    }
    type = 'ordered-list-item'
}

export default OrderedList