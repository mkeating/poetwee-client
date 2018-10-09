import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';


class Item extends Component {
  render( ) {
    return (


    		
		      <div className="item" id={this.props.id}>
		        {this.props.content}
		      </div>
	
    );
  }
}

export default Item;
