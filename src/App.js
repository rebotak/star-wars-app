import React from 'react';
import './assets/scss/main.css';
import './assets/scss/font-awesome.min.css';
import Homepage from './containers/Homepage';
import {BrowserRouter as Router, Route} from 'react-router-dom';


const App = () => (
      <div className="App">
        <Router>
          <Route path="/" component={Homepage}/>
        </Router>
      </div>
    )
export default App;
