import React, { Component } from 'react';

import Swiper from '../Swiper/Swiper';

let body = [];

class SubPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      poemComplete: false,
    };

    this.updateCurrentTweets = this.updateCurrentTweets.bind(this);
    this.checkChildren = this.checkChildren.bind(this);

    this.finalTweets = {};
  }


  //This is passed to each Swiper so that it can report back its currently shown tweet
  updateCurrentTweets(key, tweet){
    this.finalTweets[key] = tweet;
  }

  checkChildren(){
    this.setState({poemComplete: true});
  }

  startOver(){
    this.props.formStateHandler();
    this.props.resultsStateHandler();

  }

  render() {


    if (!this.state.poemComplete){

      //check if results have an error
      console.log(this.props);

      //This creates a group of n Swipers, where n is the number of words in the user's input
      let swipers = this.props.tweets.map((item, index) => {
      
        return(
              <Swiper tweets={item} key={'swiper-' + index}  unique={'swiper' + index} updateCurrentTweets={this.updateCurrentTweets} 
              />
        )
      });

      body = <div>{swipers}
                  <button onClick={this.props.pageStateHandler} className="pt-button"> Start over </button>
                  <button onClick={this.checkChildren} className="pt-button"> Done! </button>
              </div>
  

    } else {
      let finalTweets = this.finalTweets;
      let completePoem = []
      for (let line in finalTweets){
        completePoem.push(<p dangerouslySetInnerHTML={{ __html: finalTweets[line] }} ></p>);
      }
      body = <div>
              <h2>Your brilliant poetwee:</h2>
              {completePoem}
              <button onClick={this.startOver} className="pt-button"> Start over </button>
            </div>
            
    }
    

    return (
      <div>     
          {body}
      </div>
    );
  }
}

export default SubPage;
