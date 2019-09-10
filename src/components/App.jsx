/* jshint ignore:start */
import React, { Component } from 'react';
import Main from './Main';
import StickyList from './StickyList';

class App extends Component {
  render() {
    return (
      <div id='app'>
        <div className='container-fluid'>
          <div className="row">
            <div className="col-md-4 layer-shadow">
              <Main />
            </div>
            <div className="col-md-8 pl-0 pr-0">
              <StickyList />
            </div>
          </div>
        </div>
      </div>
    );  
  };
};

export default App;
/* jshint ignore:start */