import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import mod from 'react-swipeable-views-core/lib/mod';

//https://react-swipeable-views.com/getting-started/usage/

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

//TODO: prevent multiple quick clicks

class Swiper extends Component {

	constructor(props){
		super(props);
  
		this.state = {
      currentIndex: 0,
		};
	}

  componentDidMount(){
    this.props.updateCurrentTweets(this.props.unique, this.props.tweets[(mod(this.state.currentIndex, this.props.tweets.length))]);
    console.log(typeof(this.props.tweets));
  }

  componentDidUpdate(){
    //using mod to deal with 'wrapping around' when going to negative indexes
    this.props.updateCurrentTweets(this.props.unique, this.props.tweets[(mod(this.state.currentIndex, this.props.tweets.length))]);
    console.log(this.props.unique);
    console.log(this.props.tweets[(mod(this.state.currentIndex, this.props.tweets.length))]);
    console.log(this.state.currentIndex);
  }

  render() {

    const slideRenderer = ({key, index}) => {
      return (
        <div
          key={index} 
          className="item" 
          dangerouslySetInnerHTML={{ __html: this.props.tweets[(mod(index, this.props.tweets.length))] }}>         
        </div>
      );
    }

    return (
        <div>
          <div className="swiper">
            <div className="leftButton" onClick={() => this.setState({currentIndex: this.state.currentIndex - 1})}>◀</div> 
            
            <VirtualizeSwipeableViews
              enableMouseEvents={true}
              disableLazyLoading={true}
              index={this.state.currentIndex}
              onChangeIndex={(index)=>{this.setState({currentIndex:index})}}
              slideRenderer = {slideRenderer}
              >
            </VirtualizeSwipeableViews>
            
            <div className="rightButton" onClick={() => this.setState({currentIndex: this.state.currentIndex + 1})}>▶</div>
          </div>
        </div>
    );
  }
}

export default Swiper;
