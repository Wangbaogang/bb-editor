import IDecorator from './base'
import React from 'react'
import { ContentBlock, ContentState, CharacterMetadata } from 'draft-js'
import { Tooltip } from 'antd'

function getComponent(props: any) {
    console.log(props)
    const { entityKey, children, contentState } = props
    const { href } = contentState.getEntity(entityKey).getData()
    return <Tooltip placement="top" title={<a href={href} target="_blanck">{href}</a>}>
        <a href={href}>{children}</a>
    </Tooltip>
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