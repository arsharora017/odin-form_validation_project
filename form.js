const form = document.querySelector("form");
const email = document.querySelector("#mail");
const emailError = document.querySelector("#mail + span");
const errorSpan = document.querySelector("span");

// check email validity

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.style.display = "none";
  } else {
    showError();
  }
});

function showError() {
  if (email.validity.valueMissing) {
    //display message: Enter an email address
    emailError.textContent = "Enter a valid email address";
    emailError.style.display = "block";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be email";
    emailError.style.display = "block";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be atleast ${email.minLength} characters`;
    emailError.style.display = "block";
  }
}

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    showError();
    event.preventDefault();
  }
});
