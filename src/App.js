import React, { Component } from 'react';
import logo from './logo.svg';

import Form from './Form/Form';
import SubPage from  './SubPage/SubPage';



let body = {};

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      tweets: [],
      isForm: true,
      isResults: false,
      isLoading: false,
      errorMessage: '',
    }

    this.formStateHandler = this.formStateHandler.bind(this);
    this.resultsStateHandler = this.resultsStateHandler.bind(this);
    this.tweetStateHandler = this.tweetStateHandler.bind(this);
    this.loadingStateHandler = this.loadingStateHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
  }

  errorHandler(msg) {
    console.log('setting error');
    this.setState({errorMessage: msg});
  }

  formStateHandler() {
    this.setState({isForm: !this.state.isForm});
  }

  resultsStateHandler() { 
    this.setState({isResults: !this.state.isResults});
  }

  loadingStateHandler() {
    this.setState({isLoading: !this.state.isLoading});
  }

  tweetStateHandler(tweets) {
    this.setState({tweets: tweets});
  }

  render() {

    if(this.state.isForm) {
      body = 
       
      <Form 
        formStateHandler    = {this.formStateHandler}
        resultsStateHandler = {this.resultsStateHandler}
        tweetStateHandler   = {this.tweetStateHandler}
        loadingStateHandler = {this.loadingStateHandler}
        errorHandler        = {this.errorHandler}
        />
      
    }

    if(this.state.isResults){
      body = <SubPage 
        formStateHandler    = {this.formStateHandler}
        resultsStateHandler = {this.resultsStateHandler}
        tweetStateHandler = {this.tweetStateHandler}
        tweets = {this.state.tweets}/>
    }

    if(this.state.isLoading){
      body = <img src={logo} className="App-logo" alt="logo" />
    }

    console.log(this.state.errorMessage);

    return (


      <div className="App">
        <h1><img src = {require('./poetwee-logo.png')} className="poetwee-logo"/></h1>
          <div className="error"> {this.state.errorMessage} </div>
          {body}
        
      </div>
     
    );
  }
}

export default App;
