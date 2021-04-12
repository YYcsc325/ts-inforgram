@setProp(20)
class User {}

function setProp(value) {
  return function (target) {
    target.age = value;
  };
}
console.log(User.age, "dasd");
const ornamentIndex = 1;
export { ornamentIndex };
