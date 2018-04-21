import React, {Component} from 'react';
import {load as loadPeople} from '../reducers/people';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Header from '../components/Header';
import _ from 'lodash';
import {
  Card,
  // CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

@connect(
  (state) => ({
    peopleData: state.people.data,
    peopleLoading: state.people.loading,
    peopleLoaded: state.people.loaded,
    peopleList: state.people.list,
  }),{
    loadPeople,
  }
)

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount(){

  }

  componentWillMount() {
    if (this.props.peopleLoaded) {
    }else{
      this.props.loadPeople(7).then(res => {
        console.log(res.payload.data)
      })
    }
  }

  render() {
    const {
      peopleData,
      peopleLoading,
      peopleLoaded,
      peopleList,
    } = this.props

    return (
      <div className="people-page">
        <Header></Header>
        <div className="container">
          <h1 className="title">List of <span className="yellow-stroke">Star Wars</span> characters</h1>
          {peopleLoaded &&
            <h6>Showing {peopleList.length} of {peopleData.count} </h6>
          }
          {peopleLoading &&
            <Loader/>
          }
          {!peopleLoading && peopleData && peopleLoaded && peopleList &&
            <div className="people-card-wrapper">
              {_.map(peopleList, (person,index) => {
                return(
                  <Card className="person clickable" key={person.birth_year+index}>
                    <div className="fake-img" width="100%" style={{'backgroundColor': '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}}></div>
                    <CardBody>
                      <CardTitle>{person.name}</CardTitle>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <hr/>
                      <CardText>Gender: {person.gender} <br/>
                      Birth year: {person.birth_year}<br/>
                      Eye Color: {person.eye_color}<br/>
                      Hair Color: {person.hair_color}<br/>
                      Films: {person.films.length}</CardText>
                      <Button outline  size="sm" block className="btn-details" color="info">Details</Button>
                    </CardBody>
                  </Card>
                )
              })}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default People;