import React = require("react");
import { Editor, ToolBar, EditorStateGenerator } from './main'
import { EditorState, convertToRaw } from 'draft-js';
// import {stateToMarkdown} from 'draft-js-export-markdown'
import { stateToHTML } from 'draft-js-export-html'
import { Radio, Input } from 'antd';

import './App.css';
import './main.less'

interface IState {
  editorState: EditorState,
  type: string
}
class App extends React.Component {
  editorState = EditorStateGenerator(null)
  state: IState = {
    editorState: this.editorState,
    type: 'html'
  }

  afterChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    console.log(convertToRaw(contentState), editorState)
    const blockKey = selectionState.getAnchorKey()
    if (blockKey) {
      const anchorOffset = selectionState.getAnchorOffset()
      const block = contentState.getBlockForKey(blockKey)
      const entityKey = block.getEntityAt(anchorOffset)
      if (entityKey) {
        console.log("焦点处存在实体", contentState.getEntity(entityKey))
        
      }

      console.log(block.getInlineStyleAt(anchorOffset))
    }

    this.setState({
      editorState
    })
  }
  setType = (e: any) => {
    this.setState({
      type: e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <h2>富文本编辑器DEMO</h2>
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
        <Radio.Group value={this.state.type} onChange={this.setType}>
          <Radio value="html">html</Radio>
          <Radio value="markdown">markdown</Radio>
        </Radio.Group>
        <Input.TextArea
          rows={10}
          value={
            this.state.type === 'html' ?
              stateToHTML(this.state.editorState.getCurrentContent())
              :
              ""
            // stateToMarkdown(this.state.editorState.getCurrentContent())
          } />
      </div>
    );
  }
}

export default App;
