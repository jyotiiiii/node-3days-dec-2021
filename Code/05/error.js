class OddError extends Error {
  // code = "ERR_MUST_BE_EVEN";

  constructor(varName = "") {
    super(varName + " must be even");
    this.code = "ERR_MUST_BE_EVEN";
  }

  get name() {
    return "OddError";
  }
}

function doTask(amount) {
  if (typeof amount !== "number")
    throw new TypeError("amount must be a number");
  if (amount <= 0) throw new RangeError("amount must be greater than zero");
  if (amount % 2) {
    throw new OddError("amount");
  }
  return amount / 2;
}

async function run() {
  try {
    const result = doTask(2);
    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      // Some action for your developers.
      console.log("wrong type");
      throw error;
    } else if (error instanceof RangeError) {
      console.log("out of range");
    } else if (error.code === "ERR_MUST_BE_EVEN") {
      console.log("must be even");
    } else {
      console.log(error);
    }
  }
}

try {
  run();
} catch (err) {
  console.log(err);
}

run()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

async function doSomeWork() {
  try {
    const data1 = await func1().catch((e) => console.log(e));
    const data2 = await func2().catch((e) => console.log(e));
    const data3 = await func3().catch((e) => console.log(e));
    const data4 = await func4().catch((e) => console.log(e));
  } catch (err) {
    console.log(err);
  }
}

// console.log(doTask(-2));
