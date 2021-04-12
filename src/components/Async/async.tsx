const getNames = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...params,
        name: "cen",
      });
    }, 800);
  });
};
const getAges = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...params,
        age: "30",
      });
    }, 1000);
  });
};

const end = new Promise((resolve, reject) => {
  resolve({});
})
  .then((res) => {
    const name = getNames(res);
    return name;
  })
  .then((res) => {
    const age = getAges(res);
    return age;
  });
end.then((res) => {
  console.log(res, "res");
});
