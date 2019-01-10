import BaseInline from './base/inline'

class Italic extends BaseInline {
    static defaultProps: IBaseProps = {
        iconType: 'icon-italic',
        label: '斜体'
    }
    type = 'ITALIC'
}

export default Italic