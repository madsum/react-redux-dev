
Steps to implement Redux:-

### 1. Install library as:-
npm install react-redux redux redux-thunk

Redux is nothing special. It is just the way to perform certain actions depending on the action type. It is done by the switch case statement.  To do so we have to define action type and action payload (or data). 

### 2. Define the action type in a file type.js:-  
export const type = {
GET_POSTS: 'getPosts'
};

### 3. Define the switch statement for post in postReducer.js :-

import {types} from '../action/type'

export default (state=[], action) => {  
switch(action.type){  
case types.GET_POSTS:  
return action.payload;  
default:  
return state;  
  }
}

### 4. Define actual reducer as:-

import {combineReducers} from 'redux';
import postReducer from './posts/postReducer';

export default combineReducers({
postReducer
})


### 5. Define the action. For this example, I am using axios to perform REST get to fetch data from a server. npm install axios  It can be some other type of action where axios is not required. I define action.js:-

import { types } from './types';
import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
.then(res => {
dispatch({
type: types.GET_POSTS,
payload: res.data
})
})
.catch(err => {
console.log(err);
})
};

### 6. Redux is a state container for JavaScript apps, often called a Redux store. It stores the whole state of the app in an immutable object tree. We have to define store in createStore.js :-

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducer';

export const middlewares = [ReduxThunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const store = createStoreWithMiddleware(RootReducer)

### 7. We have defined our redux. But it is not used anywhere yet. We have to use redux in our app. 

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

export default connect(mapStateToProps, {fetchPosts})(App); // main connect part here.


### 8. When we render App in the index.js we have to wrap App with provider and store as follows:-

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './reducers/createStore'
import './index.css';
import App from './App';

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root')
);






