import React, { Component } from 'react';
import Bold from './bold'
import Italic from './italic'
import UnderLine from './underline'
import Header from './header'
import OrderedList from './orderedList'
import UnorderedList from './unorderedList'
import CodeBlock from './codeBlock'
import Blockquote from './blockquote'
import Divider from './divider'
import Link from './link'
import Image from './image'

class Toolbar extends Component {
    static Bold = Bold
    static Italic = Italic
    static UnderLine = UnderLine
    static Header = Header
    static OrderedList = OrderedList
    static UnorderedList = UnorderedList
    static CodeBlock = CodeBlock
    static Blockquote = Blockquote
    static Divider = Divider
    static Link = Link
    static Image = Image
    render() {
        return <div className="bb-editor-toolbar">
            {this.props.children}
        </div>
    }
}

export default Toolbar