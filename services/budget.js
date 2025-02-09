import { verify_form } from "../util/verify_form";

export const find_budget = async (year, month, save) => {
  try {
    const findBudget = await fetch(
      `http://192.168.1.114:8080/budget/${year}/${month}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const data = await findBudget.json();

    save(data);
  } catch (e) {
    console.log("catch", e);
  }
};

export const get_data_to_form = async (next) => {
  await fetch("http://192.168.1.114:8080/budget/form", {
    method: "GET",
  }).then((response) => {
    response.json().then((data) => {
      next(data);
    });
  });
};

export const submit_budget = async (data, next) => {
  if (verify_form(data)) {
    await fetch("http://192.168.1.114:8080/budget/", {
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
