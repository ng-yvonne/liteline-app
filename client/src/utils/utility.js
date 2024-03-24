export const sortUsersByUsernameAsc = (array) => {
  array.sort((a, b) =>
    a.username.localeCompare(b.username, "en", { numeric: true })
  );
};

export const isDifferentUserArray = (array1, array2) => {
  const diffFromA1toA2 = array1.filter(
    (obj1) =>
      !array2.some(
        (obj2) => obj1.uid === obj2.uid && obj1.username === obj2.username
      )
  );

  const diffFromA2toA1 = array2.filter(
    (obj2) =>
      !array1.some(
        (obj1) => obj2.uid === obj1.uid && obj2.username === obj1.username
      )
  );

  return [...diffFromA1toA2, ...diffFromA2toA1];
};
