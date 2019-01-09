import * as React from 'react';
import { Editor, Toolbar } from './main'
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Editor>
          <Toolbar>
            <Toolbar.Bold />
            <Toolbar.Italic />
            <Toolbar.UnderLine />
            {Array.from({ length: 6 }).map((item, index) => <Toolbar.Header key={index} level={index + 1} />)}
            <Toolbar.OrderedList />
            <Toolbar.UnorderedList />
            <Toolbar.Blockquote />
            <Toolbar.CodeBlock />
            <Toolbar.Divider />
            <Toolbar.Link />
            <Toolbar.Image />
          </Toolbar>
        </Editor>
      </div>
    );
  }
}

export default App;
