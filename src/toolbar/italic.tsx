import BaseInline from './base/inline'

class Italic extends BaseInline {
    render() {
        this.setType("ITALIC")
        this.setLabel("italic")
        return super.render()
    }
}

export default Italic