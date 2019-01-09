import BaseBlock from './base/block'

class Blockquote extends BaseBlock {
    render() {
        this.setType("blockquote")
        this.setLabel("blockquote")
        return super.render()
    }
}

export default Blockquote