import React, { Component } from 'react';

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount(){
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="mobile-container">
        <h1 className="clickable">Halo this is Homepage</h1>
      </div>
    );
  }
}

export default Homepage;