export default function Validation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if(values?.name || values?.email) {

    if (values.name === "") {
        errors.name = "Name should not be empty";
    } else if (values.name.length < 3 || values.name.length > 30) {
        errors.name = "Name must be between 3-30 characters";
    } else {
        errors.name = "";
    }
  }

    if (values.email === "") {
        errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Invalid Email";
    } else {
        errors.email = "";
    }

    if (values.username === "") {
        errors.username = "Username should not be empty";
    } else if (values.username.length < 3 || values.username.length > 15) {
        errors.username = "Username must be between 3 and 15 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
        errors.username = "Username can only contain letters, numbers, and underscores";
    } else {
        errors.username = "";
    }

    if (values.password === "") {
        errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password must include at least 1 uppercase, 1 lowercase, 1 number, and be at least 8 characters long";
    } else {
        errors.password = "";
    }

    return errors
}
