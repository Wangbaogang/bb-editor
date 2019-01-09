import IDecorator from './base'
import React from 'react'
import { ContentBlock, ContentState, CharacterMetadata } from 'draft-js'

function getComponent(props: any) {
    console.log(props)
    const { entityKey, children, contentState } = props
    const { href } = contentState.getEntity(entityKey).getData()
    return <a href={href}>{children}</a>
}

function findLink(contentBlock: ContentBlock, callback: (start: number, end: number) => any, contentState: ContentState) {
    contentBlock.findEntityRanges(
        (charater: CharacterMetadata) => {
            const entityKey = charater.getEntity()
            console.log(contentState, entityKey)
            return (
                entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
            )
        },
        callback
    )
}

class DividerDecorator implements IDecorator {
    strategy = findLink
    component = getComponent
}

export default DividerDecorator