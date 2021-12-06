// const arr = [1, 2, 3, 4];
// const arr2 = arr;

// // const obj = { name: "Kevin" };
// // const obj2 = {obj};
// // obj2.name = "Nathan";

// // console.log(obj);

// // arr2[0] = 7;

// // console.log(arr);

// function fn(name, date, ...rest) {
//   console.log(this);
// }

// const fn1 = (name) => {
//   console.log(this);
// };

const outerFunction = () => {
  console.log("outer", this);

  const innerFunction = () => {
    console.log("inner", this);
  };

  innerFunction();
};

outerFunction();

const test1 = () => {
  console.log(this);
};

// test1();

// const obj2 = {
//   id: 3,
//   showId: obj1.showId,
// };

// function id() {
//   console.log(this.id);
// }

// obj1.showId(12);
