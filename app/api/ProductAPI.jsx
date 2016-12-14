var $ = require('jquery');

module.exports = {
  filterProducts: function (products) {
    var filteredProducts = products;

    filteredProducts.sort((a, b) => {
      if(a.counter >= b.counter) {
        return -1;
      } else {
        return 1;
      }
    });

    return filteredProducts;
  }
};
