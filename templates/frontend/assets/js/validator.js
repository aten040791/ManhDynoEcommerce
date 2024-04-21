const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorEmail = document.querySelector(".form__email-error");
const errorPassword = document.querySelector(".form__password-error");
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
  const RegexEmail = /^[a-zA-Z0-9_-]{6,}@[a-zA-Z]+.[a-zA-Z]{2,}$/;
  return RegexEmail.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  let status = true;
  if (emailValue === "") {
    setError(email, "Email is required");
    status = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Email is not valid");
    status = false;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
    status = false;
  } else if (passwordValue.length < 8) {
    status = false;
    setError(password, "Password must be at least 8 character");
  } else {
    setSuccess(password);
  }
  return status;
};
