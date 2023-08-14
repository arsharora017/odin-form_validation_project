const form = document.querySelector("form");
const email = document.querySelector("#mail");
const emailError = document.querySelector("#mail + span");
const errorSpan = document.querySelector("span");

// check email validity

function checkEmail() {
  if (email.validity.valueMissing) {
    //display message
    emailError.textContent = "Enter a valid email address";
    emailError.style.display = "block";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be email";
    emailError.style.display = "block";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be atleast ${email.minLength} characters`;
    emailError.style.display = "block";
  } else if (email.validity.valid) {
    emailError.textContent = "";
    emailError.style.display = "none";
  }
}

// ZIP validation
function checkZIP() {
  // For each country, defines the pattern that the ZIP has to follow
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  const country = document.getElementById("Country").value;
  const ZIPField = document.getElementById("ZIP");
  const zipError = document.querySelector("#ZIPSpan");

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");

  if (!constraint.test(ZIPField.value)) {
    //display error from constraints object
    zipError.textContent = `${constraints[country][1]}`;
    zipError.style.display = "block";
  } else {
    //remove error text
    zipError.textContent = "";
  }
}

// password validation

//main password input
const pwd = document.getElementById("password");
const pwdError = document.querySelector("#pwdErrSpan");

//confirm password input
const cPwd = document.getElementById("cPassword");
const cPwdError = document.querySelector("#cPwdErrSpan");

function checkPassword() {
  // at least one number, one lowercase and one uppercase letter
  // at least six characters that are letters, numbers or the underscore
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;

  if (pwd.validity.valueMissing) {
    pwdError.textContent = "Fill the password please";
    pwdError.style.display = "block";
  } else if (!re.test(pwd.value)) {
    pwdError.textContent =
      "Password must contain at least eight characters, including uppercase, lowercase letters and numbers. ";
    pwdError.style.display = "block";
  } else {
    pwdError.textContent = "";
  }
}

function confirmPassword() {
  if (cPwd.value !== pwd.value || cPwd.value === "") {
    cPwdError.textContent = "Password don't match!";
    cPwdError.style.display = "block";
  } else {
    cPwdError.textContent = "";
  }
}

//form submit listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkEmail();
  checkZIP();
  checkPassword();
  confirmPassword();
  checkZIP();
});

//to actively check if there is input in
window.onload = () => {
  document.getElementById("mail").oninput = checkEmail;

  // we link it to the onchange event for the <select> and the oninput event for the <input>
  //this is important to load values - for ZIP
  document.getElementById("Country").onchange = checkZIP;
  document.getElementById("ZIP").oninput = checkZIP;
  document.getElementById("password").oninput = checkPassword;
  document.getElementById("cPassword").oninput = confirmPassword;
};
