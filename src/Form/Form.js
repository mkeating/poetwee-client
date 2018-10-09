import React, { Component } from 'react';



class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    
    event.preventDefault();

    if(!this.state.value || this.state.value.split(' ').length < 2) {
      this.setState({errorMessage: 'Please enter a multi-word phrase!'});
      return;
    } 

    this.props.formStateHandler();
    //turn on loading
    this.props.loadingStateHandler();

    const url = 'https://limitless-anchorage-99622.herokuapp.com/tweets'

    fetch( url, {
   
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ "value": this.state.value}),
    })
      .then(res =>{
        return res.json()
      })
      /*.then(res => {
        if(!res.ok){
          //turn off loading     
          this.props.loadingStateHandler();
          //bring back form and display error
          this.props.formStateHandler();
          this.props.errorHandler(`There was an error from the server! ${res.statusText}`);
          return null;
         }           
         else {
          return res.json();
         }  
      })*/
      .then(results => {
        if(results){
          //turn off loading
          this.props.loadingStateHandler();
         // console.log(results);
          if(results[0].error){
            console.log('error from twitter'); //works; build into UI
            console.log(results[0].error)
            this.props.formStateHandler();
            this.props.errorHandler(`There was an error from Twitter! ${results[0].error}`);
          } else{

            this.props.tweetStateHandler(results);
            this.props.resultsStateHandler();
            
          }
        }
      });    
  }  

  render() {
    return (
      <div className="form-container">

      <div>{this.state.errorMessage}</div>
      <form onSubmit = {this.handleSubmit}>
        <label> 
          <input type="text" value={this.state.value} name="searchTerms" onChange={this.handleChange} autoFocus/>
        </label>
        <input type="submit" value="Submit" className="submit-button"/>

      </form>
      </div>
    );
  }
}

export default Form;
