const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

form.addEventListener("submit", (e) => {
  const status = validateInputs();
  if (!status) {
    e.preventDefault();
  }
});

function setError(element, errorMessage) {
  const parent = element.parentElement;
  if (parent.classList.contains("success")) {
    parent.classList.remove("success");
  }
  parent.classList.add("error");
  const errorMsg = parent.querySelector(".error");
  errorMsg.innerText = errorMessage;
}

function setSuccess(element) {
  const parent = element.parentElement;
  if (parent.classList.contains("error")) {
    parent.classList.remove("error");
  }
  parent.classList.add("success");
}
const isValidEmail = (email) => {
  const RegexEmail = /^[a-zA-Z0-9]{8,20}@gmail.com$/;
  return RegexEmail.test(String(email).toLowerCase());
};

const validateInputs = () => {
  let passwordValue = "";
  let emailValue = "";
  let confirmPasswordValue = "";
  if (email) {
    emailValue = email.value.trim();
  }
  if (password) {
    passwordValue = password.value.trim();
  }
  if (confirmPassword) {
    confirmPasswordValue = confirmPassword.value.trim();
  }

  let status = true;
  if (emailValue === "") {
    if (email) {
      setError(email, "Email is required");
      status = false;
    }
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Email is not valid");
    status = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    if (password) {
      setError(password, "Password is required");
      status = false;
    }
  } else if (passwordValue.length < 8) {
    status = false;
    setError(password, "Password must be at least 8 character");
  } else {
    setSuccess(password);
  }
  if (confirmPasswordValue === "") {
    if (confirmPassword) {
      setError(confirmPassword, "Confirm password is required");
      status = false;
    }
  } else if (confirmPasswordValue !== passwordValue) {
    status = false;
    setError(
      confirmPassword,
      "The password and confirmation password do not match."
    );
  } else {
    setSuccess(confirmPassword);
  }
  return status;
};
