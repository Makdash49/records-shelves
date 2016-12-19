import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class ProductUserOne extends React.Component {

  handlePlus (e) {
    e.preventDefault();
    var {dispatch, id, counterUserOne, userOneTotal} = this.props;
    // var percentage = Math.round((counterUserOne + 1) / (userOneTotal + 1) * 100);
    dispatch(actions.startIncrementProductUserOne(id, counterUserOne));
    }

  handleMinus (e) {
    e.preventDefault();
    var {dispatch, id, counterUserOne} = this.props;
    dispatch(actions.startDeincrementProductUserOne(id, counterUserOne));
    }



  render() {
    var {text, image, counterUserOne, userOneTotal} = this.props;
    // console.log('CounterUserOne:', counterUserOne);
    // console.log('userOneTotal', userOneTotal);

    var percentage = Math.round(counterUserOne / userOneTotal * 100);
    isNaN(percentage) ? percentage = 0 : percentage = percentage;

    var myComponent = () => {
      return (
        <div>
          <div className="productImage">
            <img src={image} alt={text}/>
            <p>{text}</p>
            <button className="plusBox" onClick={this.handlePlus.bind(this)}>+</button>
            <button className="minusBox" onClick={this.handleMinus.bind(this)}>-</button>
            <p>{counterUserOne}</p>
            <h4>{percentage}%</h4>
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

export default connect()(ProductUserOne);

// export default connect(
//   (state) => {
//     return state;
//   }
// )(Product);
