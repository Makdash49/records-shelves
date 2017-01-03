import React from 'react';
import {connect} from 'react-redux';
import ProductUserOne from 'ProductUserOne';
import ProductUserTwo from 'ProductUserTwo';
import ProductFinalTotal from 'ProductFinalTotal';
import ProductAPI from 'ProductAPI'
import UserAPI from 'UserAPI';
import ReactMotionFlip from "react-motion-flip"



import * as actions from 'actions';
var socket = io();



export class Amazon extends React.Component {

  onLogout(e) {
    var {dispatch} = this.props;

    e.preventDefault();

    dispatch(actions.startLogout());
  }

  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';

      dispatch(actions.startAddProduct(todoText));
    } else {
      this.refs.todoText.focus();
    }
  }



  render() {
    var userIDs = UserAPI.filterUsers(this.props.userIDs);
    var lastUser = userIDs[userIDs.length - 1]
    var userNumber;

    if (lastUser) {
      // console.log('LASTUSER', lastUser);
      if (userIDs[userIDs.length - 1].uid === this.props.auth.uid && userIDs.length > 1) {
        // console.log("You are the latest user to log in so you will be user TWO!!");
        userNumber = "TWO"
      } else {
        // console.log('Someone logged in after you so you are user ONE!!!!');
        userNumber = "ONE"
      };
    };

    // console.log(userNumber);
    // console.log('CURRENT AUTH.UID', this.props.auth.uid);




    // // console.log('Sorted USERIDS!', userIDs);
    // // console.log('this.props.auth.uid', this.props.auth.uid);

    var {products} = this.props;
    // // // // // console.log('PRODUCTS!!!!!!!', products);
    // // // // // // console.log("AMAZON COMPONENT:", products)

    var userOneTotal = 0;
    var userTwoTotal = 0;
    products.forEach((product) => {
      userOneTotal = userOneTotal + product.counterUserOne;
      userTwoTotal = userTwoTotal + product.counterUserTwo;
    });

    // var finalTotals = userOneTotal + userTwoTotal;
    // // // // // console.log('TOTAL:', userOneTotal);


    var renderProductsUserOne = () => {
      var filteredProducts = ProductAPI.userOneFilterProducts(products);
      return filteredProducts.map((product) => {
        return (
          <ProductUserOne key={product.id} {...product} userOneTotal={userOneTotal} userNumber={userNumber}/>
        );
      });
    }

    var renderProductsUserTwo = () => {
      var filteredProducts = ProductAPI.userTwofilterProducts(products);
      return filteredProducts.map((product) => {
        return (
          <ProductUserTwo key={product.id} {...product} userTwoTotal={userTwoTotal} userNumber={userNumber}/>
        );
      });
    }

    var renderProductsUsersTotals = () => {
      var filteredProducts = ProductAPI.totalFilterProducts(products, userOneTotal, userTwoTotal);
      return filteredProducts.map((product) => {
        return (
          <ProductFinalTotal key={product.id} {...product} userOneTotal={userOneTotal} userTwoTotal={userTwoTotal}/>
        );
      });
    }

    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <div className="title-instructions">
          <h4 className="page-title">What should we buy Mom for Mother's Day?</h4>
          <ul>
            <li>Add products to vote on using the form at the bottom of the page.</li>
            <li>Vote for a product multiple times to express your enthusiasm for it.</li>
            <li>Percentages will be calculated and sumed revealing the most popular products.</li>
            <li>Log in with another browser to vote as the other user and see live updates. (Using another tab in the same browser will not work.)</li>
          </ul>
        </div>

          <div className="row" className="products-box">
            <div className="productContainer">
              <h5>Paul - Total Votes: {userOneTotal}</h5>
              <ReactMotionFlip>
                {renderProductsUserOne()}
              </ReactMotionFlip>
            </div>
            <div className="productContainer">
              <h5>Kathy - Total Votes: {userTwoTotal}</h5>
              <ReactMotionFlip>
                {renderProductsUserTwo()}
              </ReactMotionFlip>
            </div>
            <div className="productContainer">
              <h5>Total Percentages out of 200%</h5>
              <ReactMotionFlip>
                {renderProductsUsersTotals()}
              </ReactMotionFlip>
            </div>
          </div>


        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="todoText" placeholder="What would you like to buy?"/>
          <button className="button expanded">Add Product</button>
        </form>

      </div>
    )
  }
};

// export default Redux.connect()(Amazon);

export default connect(
  (state) => {
    return state;
  }
)(Amazon);
