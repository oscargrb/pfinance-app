import { verify_form } from "../util/verify_form";

export const find_details = async (year, month, save) => {
  try {
    const findDetail = await fetch(
      `http://192.168.1.114:8080/detail/${year}/${month}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const data = await findDetail.json();

    save(data);
  } catch (e) {
    console.log(e);
  }
};

export const submit_detail = async (data, next) => {
  console.log(data);
  if (verify_form(data)) {
    await fetch("http://192.168.1.114:8080/detail/", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        next();
      });
    });
  } else {
    console.log("Debe completar todos los campos");
  }
};
