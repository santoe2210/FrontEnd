export function routePaths() {
  const paths = [
    "/login",
    "/register",
    "/activate-email",
    "/register-completed",
    "/forgot-password",
    "/reset-password",
    "/forgot-password-completed",
  ];
  return paths;
}

export function getYearNumberFromID(data, id) {
  const filterItem = data.filter((item) => item._id === id);
  return filterItem[0]?.year;
}

export function reformatListYear(acYearList) {
  const temp = acYearList.map((ys) => ({
    id: ys._id,
    value: ys._id,
    name: String(ys.year),
  }));
  return temp;
}
