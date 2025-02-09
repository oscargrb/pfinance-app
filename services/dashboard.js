export const find_dashboard = async (year, month, save) => {
  fetch(`http://192.168.1.114:8080/dashboard/${year}/${month}`, {
    method: "GET",
  })
    .then((response) => {
      response
        .json()
        .then((data) => {
          console.log(data);
          save(data);
        })
        .catch((e) => {
          console.log(e);
          save(null);
        });
    })
    .catch((e) => {
      console.log(e);
      save(null);
    });
};
