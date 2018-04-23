import React, {Component} from 'react';
import {load as loadPeople} from '../reducers/people';
import {connect} from 'react-redux';
import Loader from '../components/Loader';
import Header from '../components/Header';
import PageList from '../components/Pagination';
// import _ from 'lodash';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
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
      modal: false,
      name: '',
      mountedPage: 1,
      gender: '',
      birth_year: '',
      eye_color: '',
      hair_colo: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
  }

  componentWillMount() {
    let query = new URLSearchParams(this.props.location.search);
    let currentPage = query.get('page');
    if (currentPage) {
      this.setState({mountedPage: Number(currentPage)});
      this.props.loadPeople(currentPage);
    }else{
      this.props.loadPeople(1)
    }
  }

  toggle(name, gender, birth_year, eye_color, hair_color) {
    this.setState({
      name: name,
      gender: gender,
      birth_year: birth_year,
      eye_color: eye_color,
      hair_colo: hair_color,
      modal: !this.state.modal
    });
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

    return (
      <div className="people-page">
        <Header></Header>

        {this.state.modal &&
          <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} className={this.props.className}>
            <ModalHeader toggle={this.toggle.bind(this)}>{this.state.name}</ModalHeader>
            <ModalBody>
              Gender: {this.state.gender} <br/>
              Birth year: {this.state.birth_year}<br/>
              Eye Color: {this.state.eye_color}<br/>
              Hair Color: {this.state.hair_color}<br/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Close</Button>
            </ModalFooter>
          </Modal>
        }
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
              {peopleList.map((person,index) => {
                return(
                  <Card className="person clickable" key={person.birth_year+index}>
                    <div className="fake-img" width="100%" style={{'backgroundColor': '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}}></div>
                    <CardBody>
                      <CardTitle>{person.name}</CardTitle>
                      <CardSubtitle>Played on {person.films.length} film(s).</CardSubtitle>
                      <hr/>
{/*                      <CardText>Gender: {person.gender} <br/>
                      Birth year: {person.birth_year}<br/>
                      Eye Color: {person.eye_color}<br/>
                      Hair Color: {person.hair_color}<br/>
                      Films: {person.films.length}</CardText>*/}
                      <Button onClick={this.toggle.bind(this, person.name, person.gender, person.birth_year, person.eye_color, person.hair_color)} className="btn-details btn btn-outline-info btn-sm btn-block">Details</Button>
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