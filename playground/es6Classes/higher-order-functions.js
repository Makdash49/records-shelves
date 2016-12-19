// function one (name, location) {
//   // // // console.log(name, location);
//
// }
//
//
// function two () {
//   // // // console.log('Args', arguments);
//   one.apply(undefined, arguments);
// }
//
// two('Andrew', 'Philadelphia');

var add = (a, b) => a + b;
var square = (a) => a * a;

var callAndLog = (func) => {
  return function () {
    var res = func.apply(undefined, arguments);
    // // // console.log('Result is ' + res);
    return res;
  };
};

// // // // console.log(add(99, 1));
//
// var addAndLog = callAndLog(add);
// // // // console.log(addAndLog(44, -3));

var squareAndLog = callAndLog(square);
squareAndLog(3);

// create another function called square takes one number
// and return square result.  3 gives 9 back.
// squareAndLog using callAndLog
// Then // // // consolelog it.
//
// result is 9
