import React, {Component} from 'react';
import {load as loadPeople} from '../reducers/people';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Header from '../components/Header';
import PageList from '../components/Pagination';
import _ from 'lodash';
import {Link} from 'react-router-dom';

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
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
      mountedPage: 1,
    }
  }

  componentDidMount(){
  }

  componentWillMount() {
    let query = new URLSearchParams(this.props.location.search);
    let currentPage = query.get('page');
    if (currentPage) {
      this.setState({mountedPage: Number(currentPage)});
      this.props.loadPeople(currentPage);
      // console.log(currentPage);
      // console.log(this.state.mountedPage);
      // .then(res => {
      //  console.log(res.payload.data)
      // })
    }else{
      this.props.loadPeople(1)
    }
  }

  render() {

    const {
      peopleData,
      peopleLoading,
      peopleLoaded,
      peopleList,
    } = this.props;
    const {
      mountedPage
    } = this.state;
    // const query = new URLSearchParams(this.props.location.search);
    // const currentPage = query.get('page');

    return (
      <div className="people-page">
        <Header></Header>
        <div className="container">
          <h1 className="title">List of <span className="yellow-stroke">Star Wars</span> characters</h1>
          <PageList
            count={87}
            mountedPage={mountedPage}
            perPage={10}
          />
          {peopleLoading &&
            <Loader/>
          }
          {peopleLoaded && !peopleLoading &&
            <h6>Showing {peopleList.length} of {peopleData.count} </h6>
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
                      <Link to={`/?page=${index}`} className="btn-details btn btn-outline-info btn-sm btn-block">Details</Link>
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