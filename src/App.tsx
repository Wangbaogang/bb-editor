import * as React from 'react';
import { Editor, Toolbar, EditorStateGenerator } from './main'
import { EditorState, convertToRaw } from 'draft-js';
import {stateToMarkdown} from 'draft-js-export-markdown'
import {stateToHTML} from 'draft-js-export-html'
import { Radio, Input } from 'antd';

import './App.css';

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
            <Toolbar.Bold />
            <Toolbar.Italic />
            <Toolbar.UnderLine />
            <Toolbar.Header />
            <Toolbar.OrderedList />
            <Toolbar.UnorderedList />
            <Toolbar.Blockquote />
            <Toolbar.CodeBlock />
            <Toolbar.Divider />
            <Toolbar.Link />
            <Toolbar.Image />
          </Toolbar>
        </Editor>
        <Radio.Group value={this.state.type} onChange={this.setType}>
          <Radio value="html">html</Radio>
          <Radio value="markdown">markdown</Radio>
        </Radio.Group>
        <Input.TextArea value={
          this.state.type === 'html' ?
          stateToHTML(this.state.editorState.getCurrentContent())
          : 
          stateToMarkdown(this.state.editorState.getCurrentContent())
        }/>
      </div>
    );
  }
}

export default App;
