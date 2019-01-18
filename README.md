# bb-editor
## This project is in beta , please use it with caution.

[![Travis Status](https://img.shields.io/travis/Wangbaogang/bb-editor.svg)](https://travis-ci.org/Wangbaogang/bb-editor)
[![NPM Version](https://img.shields.io/npm/v/bb-editor.svg)](https://www.npmjs.com/package/bb-editor)
[![LICENSE](https://img.shields.io/npm/l/bb-editor.svg)](https://github.com/Wangbaogang/bb-editor/blob/master/LICENSE)

This is a UI component built in React. 
It's based on [Draft.js](https://draftjs.org/), an rich text editor framework for React.

## Demo

No demo yet, but we wikk add it as soon as possible.

## Install
Install with npm

    $ npm install bb-editor --save

Install with yarn

    $ yarn add bb-editor

## Introduction

`bb-editor` is a rich text editor based on [draftjs](https://draftjs.org/) and [ant design](https://ant.design).
It support typescript.
if your project is based on react or based on react and typescript, bb-editor may be for you.

The core idea of the project is to enable people to build their own editors like building blocks.
This is also the origin of the project name.

### usage

```javascript

import { Editor, ToolBar, EditorStateGenerator } from 'bb-editor'

class MyEditor extend React.Component {
    editorState = EditorStateGenerator()
    afterChange = (editorState) => {
        // do something
    }
    render() {
        return (
            <Editor
                value={this.editorState}
                afterChange={this.afterChange}>
                <ToolBar>
                    <ToolBar.Action.Bold />
                    <ToolBar.Action.Italic />
                    <ToolBar.Action.UnderLine />
                    <ToolBar.Action.StrikeThrough />

                    <ToolBar.Divider />

                    <ToolBar.Action.Header />
                    <ToolBar.Action.OrderedList />
                    <ToolBar.Action.UnorderedList />
                    <ToolBar.Action.Blockquote />
                    <ToolBar.Action.CodeBlock />
                    <ToolBar.Action.Divider />

                    <ToolBar.Divider />

                    <ToolBar.Action.Link />
                    <ToolBar.Action.Image />
                </ToolBar>
            </Editor>
        )
    }
}
    
    
```