export function isValidNumber(id: number) {
  if(!id) {
    throw new Error("The number is null");
  };

  if(typeof id !== "number") {
    throw new Error("It was expected an number");
  };

  if(!Number.isInteger(id)) {
    throw new Error("The number is not an integer");
  };

  if(id <= 0) {
    throw new Error("The number must be equal or greater than 1");
  };
};