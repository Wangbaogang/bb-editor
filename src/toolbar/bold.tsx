import BaseInline from './base/inline'

class Bold extends BaseInline {
    static defaultProps:IBaseProps = {
        iconType: 'icon-bold',
        label: '加粗'
    }
    type = 'BOLD'
}

export default Bold