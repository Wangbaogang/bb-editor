import {Editor, ToolBar, EditorStateGenerator} from 'bb-editor'
import React from 'react'

class Test extends React.Component {
  render() {
    return <Editor value={EditorStateGenerator()}>
      <ToolBar>
        <ToolBar.Buttons.Blockquote />
        <ToolBar.Divider />
      </ToolBar>

    </Editor>
  }
}

export default Test

