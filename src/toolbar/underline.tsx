import BaseInline from './base/inline'

class UnderLine extends BaseInline {
    render() {
        this.setType("UNDERLINE")
        this.setLabel("underline")
        return super.render()
    }
}

export default UnderLine