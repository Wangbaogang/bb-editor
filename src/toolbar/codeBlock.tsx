import BaseBlock from './base/block'

class Header extends BaseBlock {
    render() {
        this.setType("code-block")
        this.setLabel("code block")
        return super.render()
    }
}

export default Header