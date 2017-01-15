// function add (a, b) {
//   return a + b
// }
//
// // // // // // // console.log(add(3, 1));
//
//
// var toAdd = [9, 5];
//
// // // // // // // console.log(add(...toAdd));


// var groupA = ["Bob", "Anne"];
// var groupB = ["Vikram"];
// var final = [...groupB, 3, ...groupA];
//
// // // // // // // console.log(final)


var person = ['Andrew', 25];
var personTwo = ['Jen', 29];
// Hi Andrew, you are 25.

var nameAge = function (name, age) {
  // // // // // // console.log("Hi " + name + ", you are " + age)
};

nameAge(...person);
nameAge(...personTwo);



var names = ['Mike', 'Ben'];
var final = [...names, 'Mark'];
// Hi Mark - use for each.


for (var i = 0; i < final.length; i++) {
  // // // // // // console.log("Hi " + final[i])
};

final.forEach(function (name) {
  // // // // // // console.log("Yoooo " + name)
});
