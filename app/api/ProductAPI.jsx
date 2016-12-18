var $ = require('jquery');

module.exports = {
  userOneFilterProducts: function (products) {
    var filteredProducts = products;

    filteredProducts.sort((a, b) => {
      if(a.counterUserOne >= b.counterUserOne) {
        return -1;
      } else {
        return 1;
      }
    });

    return filteredProducts;
  },
  userTwofilterProducts: function (products) {
    var filteredProducts = products;

    filteredProducts.sort((a, b) => {
      if(a.counterUserTwo >= b.counterUserTwo) {
        return -1;
      } else {
        return 1;
      }
    });

    return filteredProducts;
  },
  totalFilterProducts: function (products) {
    var filteredProducts = products;

    filteredProducts.sort((a, b) => {
      if(a.counterTotals >= b.counterTotals) {
        return -1;
      } else {
        return 1;
      }
    });

    return filteredProducts;
  },

};
