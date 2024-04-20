import moment from "moment";

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

export function getClouserDateName(data, id) {
  const filterItem = data?.filter((item) => item._id === id);

  if (filterItem?.length > 0) {
    const name = `${moment(filterItem[0].closureDate).format(
      "DD/MMM/YYYY"
    )} to ${moment(filterItem[0].finalClosureDate).format("DD/MMM/YYYY")}`;
    return name;
  }

  return "-";
}

export function getClouserDateDetail(data, id) {
  const filterItem = data?.filter((item) => item._id === id);
  if (filterItem) {
    return filterItem[0] || [];
  }
  return [];
}

export function getYearNumberFromID(data, id) {
  const filterItem = data?.filter((item) => item._id === id);
  return filterItem[0]?.year;
}

export function getFacultyFromID(data, id) {
  const filterItem = data?.filter((item) => item._id === id);
  return filterItem[0]?.name;
}

export function reformatListYear(acYearList) {
  const temp = acYearList.map((ys) => ({
    id: ys._id,
    value: ys._id,
    name: String(ys.year),
  }));
  return temp;
}

export function reformatListFaculty(lists) {
  const temp = lists.map((ys) => ({
    id: ys._id,
    value: ys._id,
    name: String(ys.name),
  }));
  return temp;
}

export function reformatClouserDate(clouserLists, acYearList) {
  const combinedArray = [];

  clouserLists?.forEach((obj1) => {
    const matchingObj = acYearList?.find(
      (obj2) => obj2._id === obj1.academicYear
    );

    if (matchingObj) {
      const combinedObj = {
        ...obj1,
        ...matchingObj,
        value: obj1._id,
      };

      combinedArray.push(combinedObj);
    }
  });

  const temp = combinedArray.map((ys) => ({
    id: ys.value,
    value: ys.value,
    name: `${ys.year} (${moment(ys.closureDate).format(
      "DD/MMM/YYYY"
    )} to ${moment(ys.finalClosureDate).format("DD/MMM/YYYY")})`,
  }));

  return temp;
}

export function checkAcademicPassed(data) {
  const finalClosureDate = moment(data?.finalClosureDate);
  const currentDate = moment();

  if (currentDate.isAfter(finalClosureDate)) {
    return true;
  }
  return false;
}

export function passed14Days(date) {
  const providedDate = moment(date);
  const endDate = providedDate.clone().add(14, "days");

  // Current date
  const currentDate = moment();

  // Compare the current date with the end date
  if (currentDate.isAfter(endDate)) {
    return true;
  }
  return false;
}

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function splitBase64IntoChunks(base64Data, chunkSize) {
  const chunks = [];
  let index = 0;

  while (index < base64Data.length) {
    chunks.push(base64Data.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return chunks;
}
