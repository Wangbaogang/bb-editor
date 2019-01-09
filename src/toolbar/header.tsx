import BaseBlock from './base/block'

const headerValues: string[] = ['one', 'two', 'three', 'four', 'five', 'six']

function getHeaderValue(index: number): string {
    return headerValues[index]
}

class Header extends BaseBlock {
    props: {
        level: number
    }
    render() {
        const { level } = this.props
        const label = getHeaderValue(level - 1)
        this.setType(`header-${label}`)
        this.setLabel("H" + level)
        return super.render()
    }
}

export default Header