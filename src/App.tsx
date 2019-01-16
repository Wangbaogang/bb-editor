import * as React from 'react';
import { Editor, Toolbar, EditorStateGenerator } from './main.js'
import { EditorState, convertToRaw } from 'draft-js';
// import {stateToMarkdown} from 'draft-js-export-markdown'
import {stateToHTML} from 'draft-js-export-html'
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
    console.log(convertToRaw(editorState.getCurrentContent()))
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
        <Editor
          value={this.editorState}
          afterChange={this.afterChange}>
          <Toolbar>
            <Toolbar.Action.Bold />
            <Toolbar.Action.Italic />
            <Toolbar.Action.UnderLine />
            <Toolbar.Action.StrikeThrough />

            <Toolbar.Divider />

            <Toolbar.Action.Header />
            <Toolbar.Action.OrderedList />
            <Toolbar.Action.UnorderedList />
            <Toolbar.Action.Blockquote />
            <Toolbar.Action.CodeBlock />
            <Toolbar.Action.Divider />

            <Toolbar.Divider />

            <Toolbar.Action.Link />
            <Toolbar.Action.Image />
          </Toolbar>
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
        }/>
      </div>
    );
  }
}

export default App;
