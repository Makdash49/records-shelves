import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class Product extends React.Component {

  handlePlus (e) {
    e.preventDefault();
    var {dispatch, id, counter} = this.props;
    dispatch(actions.startIncrementProduct(id, counter));
    }

  handleMinus (e) {
    e.preventDefault();
    var {dispatch, id, counter} = this.props;
    dispatch(actions.startDeincrementProduct(id, counter));
    }



  render() {
    var {text, image, counter, total} = this.props;
    console.log('Counter:', counter);

    var myComponent = () => {
      return (
        <div>
          <div className="productImage">
            <img src={image} alt={text}/>
            <p>{text}</p>
            <button className="plusBox" onClick={this.handlePlus.bind(this)}>+</button>
            <button className="minusBox" onClick={this.handleMinus.bind(this)}>-</button>
            <p>{counter}</p>
            <h4>{counter/total * 100}%</h4>
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
