var $ = require('jquery');

module.exports = {
  userOneFilterProducts: function (products) {
    var filteredProducts = products;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt <= b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });

    newFilteredProducts.sort((a, b) => {
      if(a.counterUserOne > b.counterUserOne) {
        return -1;
      } else if (a.counterUserOne < b.counterUserOne) {
        return 1;
      } else {
        return 0
      }
    });

    return newFilteredProducts;
  },
  userTwofilterProducts: function (products) {
    var filteredProducts = products;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt <= b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });

    newFilteredProducts.sort((a, b) => {
      if(a.counterUserTwo > b.counterUserTwo) {
        return -1;
      } else if (a.counterUserTwo < b.counterUserTwo) {
        return 1;
      } else {
        return 0
      }
    });

    return newFilteredProducts;
  },
  totalFilterProducts: function (products, userOneTotal, userTwoTotal) {
    console.log('PRODUCTS - PRODUCTS - PRODUCST', products);
    var filteredProducts = products;

    // isNaN(userOneTotal) ? userOneTotal = 0 : userOneTotal = userOneTotal;
    // isNaN(userTwoTotal) ? userTwoTotal = 0 : userTwoTotal = userTwoTotal;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt <= b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });

    newFilteredProducts.sort((a, b) => {
      console.log('START a.counterUserOne');
      console.log('a.counterUserOne', a.counterUserOne);
      console.log('userOneTotal', userOneTotal);
      var percentageUserOne = Math.round((a.counterUserOne / userOneTotal));
      console.log('percentageUserOne', percentageUserOne );

      var percentageUserTwo = Math.round((a.counterUserTwo / userTwoTotal));
      console.log('percentageUserTwo', percentageUserTwo);


      isNaN(percentageUserOne) ? percentageUserOne = 0 : percentageUserOne = percentageUserOne;
      isNaN(percentageUserTwo) ? percentageUserTwo = 0 : percentageUserTwo = percentageUserTwo;
      var aFinalPercentage = percentageUserOne + percentageUserTwo;
      console.log('aFinalPercentage', aFinalPercentage);

      // isNaN(aFinalPercentage) ? aFinalPercentage = 0 : aFinalPercentage = aFinalPercentage;
      console.log('aFinalPercentage', aFinalPercentage);
      console.log('END a.counterUserOne');

      console.log('START b.counterUserOne');
      console.log('b.counterUserOne', b.counterUserOne);
      var percentageUserOne = Math.round((b.counterUserOne / userOneTotal));
      console.log('percentageUserOne', percentageUserOne );


      var percentageUserTwo = Math.round((b.counterUserTwo / userTwoTotal));
      console.log('percentageUserTwo', percentageUserTwo);

      isNaN(percentageUserOne) ? percentageUserOne = 0 : percentageUserOne = percentageUserOne;
      isNaN(percentageUserTwo) ? percentageUserTwo = 0 : percentageUserTwo = percentageUserTwo;
      var bFinalPercentage = percentageUserOne + percentageUserTwo;
      console.log('bFinalPercentage', bFinalPercentage);


      // isNaN(bFinalPercentage) ? bFinalPercentage = 0 : bFinalPercentage = bFinalPercentage;
      console.log('isNANbFinalPercentage', bFinalPercentage);
      console.log('FINAL END ****************');


      if(aFinalPercentage > bFinalPercentage) {
        return -1;
      } else if (aFinalPercentage < bFinalPercentage) {
        return 1;
      } else {
        return 0
      }
    });

    return newFilteredProducts;
  },

};
