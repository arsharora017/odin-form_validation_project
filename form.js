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
    //display message
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

// we link it to the onchange event for the <select> and the oninput event for the <input>
//this is important to load values
window.onload = () => {
  document.getElementById("Country").onchange = checkZIP;
  document.getElementById("ZIP").oninput = checkZIP;
};
