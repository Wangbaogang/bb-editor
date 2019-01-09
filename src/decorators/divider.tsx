import IDecorator from './base'
import AntDivider from 'antd/lib/divider'
import React from 'react'
import { ContentBlock, ContentState, CharacterMetadata } from 'draft-js'

function getComponent() {
    return <AntDivider/>
}

function findDividers(contentBlock: ContentBlock, callback: (start: number, end: number) => any, contentState: ContentState) {
    contentBlock.findEntityRanges(
        (charater: CharacterMetadata) => {
            const entityKey = charater.getEntity()
            console.log(contentState, entityKey)
            return (
                entityKey !== null && contentState.getEntity(entityKey).getType() === 'DIVIDER'
            )
        },
        callback
    )
}

class DividerDecorator implements IDecorator {
    strategy = findDividers
    component = getComponent
}

export default DividerDecorator