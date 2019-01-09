import BaseBlock from './base/block'

class OrderedList extends BaseBlock {
    render() {
        this.setType("ordered-list-item")
        this.setLabel("OL")
        return super.render()
    }
}

export default OrderedList