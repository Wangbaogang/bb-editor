
import {ContentState, ContentBlock} from 'draft-js'

 interface IDecorator {
    strategy: (contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => void
    component: any
}

export default IDecorator
