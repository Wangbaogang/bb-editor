import BaseInline,{IBaseProps} from './base/inline'

class UnderLine extends BaseInline {
    static defaultProps: IBaseProps = {
        iconType: 'icon-underline',
        label: '下划线'
    }
    type = 'UNDERLINE'
}

export default UnderLine