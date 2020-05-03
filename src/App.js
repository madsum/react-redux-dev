import React, { Component } from 'react'
import { connect } from 'react-redux';
import {fetchPosts} from './reducers/action/action'
import ListItem from './component/ListItem'

export class App extends Component {
  
  constructor(props){
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  fetch(){
   this.props.fetchPosts();
  }
  
  render() {
    const { postReducer } = this.props;
    return (
      <div>
        <button onClick={() => this.fetch()}>Get Post</button>
        {
          postReducer.length > 0 &&
            <div>
              {
                postReducer.map((post, index) => {
                const { title, body } = post;
               
                const configListItem = {
                  title,
                  desc: body
                };
                return (
                  <ListItem key={index} {...configListItem} />                  
                )
              })}
            </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postReducer: state.postReducer
  }
}

export default connect(mapStateToProps, {fetchPosts})(App);

