var $ = require('jquery');

module.exports = {
  userOneFilterProducts: function (products) {
    var filteredProducts = products;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt >= b.createdAt) {
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
      if(a.createdAt >= b.createdAt) {
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
    var filteredProducts = products;

    var newFilteredProducts = filteredProducts.sort((a, b) => {
      if(a.createdAt >= b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });

    newFilteredProducts.sort((a, b) => {
      var percentageUserOne = Math.round(a.counterUserOne / userOneTotal * 100);
      var percentageUserTwo = Math.round(a.counterUserTwo / userTwoTotal * 100);
      var aFinalPercentage = percentageUserOne + percentageUserTwo;
      isNaN(aFinalPercentage) ? aFinalPercentage = 0 : aFinalPercentage = aFinalPercentage;
      // // console.log('aFinalPercentage', aFinalPercentage);

      var percentageUserOne = Math.round(b.counterUserOne / userOneTotal * 100);
      var percentageUserTwo = Math.round(b.counterUserTwo / userTwoTotal * 100);
      var bFinalPercentage = percentageUserOne + percentageUserTwo;
      isNaN(bFinalPercentage) ? bFinalPercentage = 0 : bFinalPercentage = bFinalPercentage;
      // // console.log('bFinalPercentage'), bFinalPercentage;

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
