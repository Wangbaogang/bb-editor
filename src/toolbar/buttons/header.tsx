import BaseBlock,{IBaseProps} from './base/block'

// const headerValues: string[] = ['one', 'two', 'three', 'four', 'five', 'six']

// function getHeaderValue(index: number): string {
//     return headerValues[index]
// }

class Header extends BaseBlock {
    static defaultProps: IBaseProps = {
        iconType: 'icon-biaotizhengwenqiehuan',
        label: '标题'
    }
    type = 'header-one'
}

export default Header