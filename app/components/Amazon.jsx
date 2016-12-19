import React from 'react';
import {connect} from 'react-redux';
import ProductUserOne from 'ProductUserOne';
import ProductUserTwo from 'ProductUserTwo';
import ProductFinalTotal from 'ProductFinalTotal';
import ProductAPI from 'ProductAPI'
import UserAPI from 'UserAPI';


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
      console.log('LASTUSER', lastUser);
      if (userIDs[userIDs.length - 1].uid === this.props.auth.uid) {
        console.log("You are the latest user to log in so you will be user TWO!!");
        userNumber = "TWO"
      } else {
        console.log('Someone logged in after you so you are user ONE!!!!');
        userNumber = "ONE"
      };
    };

    console.log(userNumber);
    console.log('CURRENT AUTH.UID', this.props.auth.uid);




    // console.log('Sorted USERIDS!', userIDs);
    // console.log('this.props.auth.uid', this.props.auth.uid);

    var {products} = this.props;
    // // // // console.log('PRODUCTS!!!!!!!', products);
    // // // // // console.log("AMAZON COMPONENT:", products)

    var userOneTotal = 0;
    var userTwoTotal = 0;
    products.forEach((product) => {
      userOneTotal = userOneTotal + product.counterUserOne;
      userTwoTotal = userTwoTotal + product.counterUserTwo;
    });

    // var finalTotals = userOneTotal + userTwoTotal;
    // // // // console.log('TOTAL:', userOneTotal);


    var renderProductsUserOne = () => {
      var filteredProducts = ProductAPI.userOneFilterProducts(products);
      return filteredProducts.map((product) => {
        return (
          <ProductUserOne key={product.id} {...product} userOneTotal={userOneTotal}/>
        );
      });
    }

    var renderProductsUserTwo = () => {
      var filteredProducts = ProductAPI.userTwofilterProducts(products);
      return filteredProducts.map((product) => {
        return (
          <ProductUserTwo key={product.id} {...product} userTwoTotal={userTwoTotal}/>
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
        <h1 className="page-title">Product Vote</h1>

        <div className="row">
            <div className="productContainer">
              <h5>TOTAL VOTES: {userOneTotal}</h5>
              {renderProductsUserOne()}
            </div>
            <div className="productContainer">
              <h5>TOTAL VOTES: {userTwoTotal}</h5>
              {renderProductsUserTwo()}
            </div>
            <div className="productContainer">
              <h5>TOTAL PERCENTAGES OUT OF 200%</h5>
              {renderProductsUsersTotals()}
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
