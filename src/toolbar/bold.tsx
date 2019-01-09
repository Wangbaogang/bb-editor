import BaseInline from './base/inline'

class Bold extends BaseInline {
    render() {
        this.setType("BOLD")
        this.setLabel("bold")
        return super.render()
    }
}

export default Bold