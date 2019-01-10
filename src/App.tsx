import * as React from 'react';
import { Editor, Toolbar, EditorStateGenerator } from './main'
import './App.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
// const {stateToMarkdown} = require('draft-js-export-markdown')
import {stateToMarkdown} from 'draft-js-export-markdown'
import {stateToHTML} from 'draft-js-export-html'

interface IState {
  contentState: ContentState
}
class App extends React.Component {
  editorState = EditorStateGenerator(null)
  state: IState = {
    contentState: this.editorState.getCurrentContent()
  }

  onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent()
    console.log(convertToRaw(contentState))
    this.setState({
      contentState
    })
  }
  render() {
    return (
      <div className="App">
        <Editor
          value={this.editorState}
          onChange={this.onChange}>
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
        <dl>
          <dt>html</dt>
          <dd>{stateToHTML(this.state.contentState)}</dd>
        </dl>
        <dl>
          <dt>markdown</dt>
          <dd>{stateToMarkdown(this.state.contentState)}</dd>
        </dl>
      </div>
    );
  }
}

export default App;
