import BaseInline from './base/inline'

class StrikeThrough extends BaseInline {
    static defaultProps:IBaseProps = {
        iconType: 'icon-strike',
        label: '删除线'
    }
    type = 'STRIKETHROUGH'
}

export default StrikeThrough