import React from 'react';
import './assets/scss/main.css';
import People from './containers/People';
import {BrowserRouter as Router, Route} from 'react-router-dom';


const App = () => (
      <div className="App">
        <Router>
          <Route path="/" component={People}/>
        </Router>
      </div>
    )
export default App;
