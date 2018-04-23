import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import _ from 'lodash';
import {load as loadPeople} from '../reducers/people';
import {connect} from 'react-redux';
import createHistory from "history/createBrowserHistory"

@connect(
  (state) => ({
    peopleLoading: state.people.loading,
  }),{
    loadPeople,
  }
)

class PageList extends Component {

  constructor(props) {
    super(props)
    this.state = {
    	pageNumber: 1,
    }
  }

  componentDidMount(){
  	// console.log(this.state.pageNumber)
  	if (this.props.mountedPage < 10) {
  		this.setState({pageNumber: this.props.mountedPage})
  	}return
  }

  loadPage(page){
		const history = createHistory();
  	this.props.loadPeople(page);
  	this.setState({pageNumber: page});
  	history.push(`/?page=${page}`);
  }

  loadPrev(){
    const history = createHistory();
  	this.props.loadPeople(this.state.pageNumber - 1)
  	this.setState({pageNumber: this.state.pageNumber - 1});
    history.push(`/?page=${this.state.pageNumber -1}`);
  }

  loadNext(){
    const history = createHistory();
    this.props.loadPeople(this.state.pageNumber + 1)
    this.setState({pageNumber: this.state.pageNumber + 1});
    history.push(`/?page=${this.state.pageNumber + 1}`);
  }

  render() {

		const {
			peopleLoading,
			count,
			perPage
		} = this.props;
		const {pageNumber} = this.state;
		const max = Math.ceil(count/perPage);
		const paginatnionItem = [];

		for(var i=0;i< max; i++){
	    paginatnionItem.push( i+1)
    };

    return (
    	<div className="pagination-wrapper d-flex mt-5 justify-content-center">
	      <Pagination size="sm">
	        <PaginationItem disabled={(pageNumber === 1) || peopleLoading}>
	          <PaginationLink previous href="#" onClick={this.loadPrev.bind(this)}/>
	        </PaginationItem>
	        {paginatnionItem.map(p => {
	        	return(
	        		<li className={'page-item '+ ((p === pageNumber)?'active ':'') +((peopleLoading)?'disabled':'') } key={p}>
	        			<span href="#" className="page-link" onClick={this.loadPage.bind(this,p)}>
	        				{p}
	        			</span>
	        		</li>
	        	)
	        })}
	        <PaginationItem  disabled={(pageNumber === 9) || peopleLoading}>
	          <PaginationLink next href="#" onClick={this.loadNext.bind(this)}/>
	        </PaginationItem>
	      </Pagination>
			</div>
    )
  };
}

export default PageList;
