// // Rufus -> Dog -> Wolf

// // Object.create()

// const wolf = {
//   howl: function () {
//     console.log(`${this.name}: awwooooooo`);
//   },
// };

// const dog = Object.create(wolf, {
//   woof: {
//     value: function () {
//       console.log(`${this.name}: woooooff`);
//     },
//     enumerable: false,
//     writable: false,
//     configurable: false,
//   },
// });

// const rufus = Object.create(dog, {
//   name: {
//     value: "Rufus the dog",
//   },
// });

// rufus.woof();
// rufus.howl();

// // Object.defineProperty(dog, woof, {
// //   value: function () {
// //     console.log(`${this.name}: woooooff`);
// //   },
// //   enumerable: true,
// //   writable: true,
// //   configurable: true,
// // });

// // dog.woof = function () {
// //   console.log(`${this.name}: woooooff`);
// // };

// function Wolf(name) {
//   this.name = name;
// }

// Wolf.prototype.howl = function () {
//   console.log(`${this.name}: awwwooooooo`);
// };

// function Dog(name) {
//   Wolf.call(this, name + " the dog");
// }

// Dog.prototype = Wolf.prototype;

// Dog.prototype.woof = function () {
//   console.log(`${this.name} woofs!`);
// };

// const rufus = new Dog("Rufus");

// rufus.woof();
// rufus.howl();

class Wolf {
  constructor(name) {
    this.name = name;
  }

  howl() {
    console.log(`${this.name}: aawwoooo`);
  }
}

class Dog extends Wolf {
  constructor(name) {
    super(name + " the dog");
  }

  woof() {
    console.log(`${this.name} woofs`);
  }
}

const rufus = new Dog("Rufus");
