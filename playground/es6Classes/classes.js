class Person {
  constructor (name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting () {
    return `Hi! I'm ${this.name}.`;
  }

  getDescription () {
    return `${this.name} is ${this.age} year(s) old.`;
  }
  toString () {
    return JSON.stringify(this);
  }
}


class Child extends Person {
  constructor (name, age, like) {
    super(name, age);
    this.like = like;
  }
  getGreeting () {
    return `Hiiiiiii! My name is ${this.name} and I like ${this.like}.`;
  }
}

class Baby extends Person {
  getGreeting () {
    return 'Wahhhhhhhhh!';
  }
}


var me = new Baby('Andrew', 25);
console.log(me.getGreeting());

var anonymous = new Baby('Mike', 4)
console.log(anonymous.getGreeting());


// baby class.  Override get greating.  Waahhhhhhh.
// No new properties. No constructor. No super.

// definte getGreeting.  Change people to a baby.
// call greeting.
