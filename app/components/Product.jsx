import React from 'react';
import {connect} from 'react-redux';


export class Product extends React.Component {

  handleClick (e) {
    e.preventDefault();
    console.log("I'm pressing the + button");
  }

  render() {
    var {text, image} = this.props;

    var myComponent = () => {
      return (
        <div>
          <div className="productImage">
            <img src={image} alt={text}/>
            <p>{text}</p>
            <button className="plusBox" onClick={this.handleClick.bind(this)}>+</button>
          </div>
        </div>
      );
    };


    return (
      <div>
        {myComponent()}
      </div>
    )
  }
};

export default connect()(Product);

// export default connect(
//   (state) => {
//     return state;
//   }
// )(Product);
