import BaseBlock from './base/block'

class UnorderedList extends BaseBlock {
    render() {
        this.setType("unordered-list-item")
        this.setLabel("UL")
        return super.render()
    }
}

export default UnorderedList