export const verify_form = (form) => {
  let valid = true;

  for (let key of Object.keys(form)) {
    if (!form[key] || form[key].lenght === 0) {
      valid = false;
    }
  }

  return valid;
};
