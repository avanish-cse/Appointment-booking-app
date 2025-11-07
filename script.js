// -----------------------------
// Container Elements
// -----------------------------
let formContainer = document.querySelector(".form-container");
let noteContainer = document.querySelector(".note-container");

let form = document.querySelector("form");

// -----------------------------
// Switching between Note Form & Note Card
// -----------------------------
let addBtn = document.getElementById("add-note");

addBtn.addEventListener("click", () => {
    noteContainer.classList.add("hidden");
    formContainer.classList.remove("hidden");
});

let formCloseBtn = document.querySelector("#form-close-button");

formCloseBtn.addEventListener("click", () => {
    formContainer.classList.add("hidden");
    noteContainer.classList.remove("hidden");
});

// -----------------------------
// Regex Declarations
// -----------------------------
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
const fullNameRegex = /^[A-Za-z]+([ .'-][A-Za-z]+)*$/;
const textInputRegex = /^[A-Za-z0-9 .,!?'"\-()]+$/;

// -----------------------------
// Form Validation Functions
// -----------------------------
function isValidImageUrl(input) {
    return urlRegex.test(input);
}

function isValidName(input) {
    return fullNameRegex.test(input);
}

function isValidText(input) {
    return textInputRegex.test(input);
}

// -----------------------------
// Form Submission & Input Validation
// -----------------------------
form.addEventListener("submit", (event) => {

    // --- Get current input values ---
    let imgUrl = document.querySelector("#image-url").value.trim();
    let fullName = document.querySelector("#full-name").value.trim();
    let homeTown = document.querySelector("#home-town").value.trim();
    let purpose = document.querySelector("#purpose").value.trim();
    let selectedCategory = document.querySelector('input[name="category"]:checked');

    // --- Validation flags ---
    let isValid = true;

    // --- Image URL validation ---
    if (!isValidImageUrl(imgUrl)) {
        alert("Enter a Valid Image Link !!");
        isValid = false;
    }

    // --- Full Name validation ---
    if (!isValidName(fullName)) {
        alert("Enter a valid Name !!");
        isValid = false;
    }

    // --- Home Town validation ---
    if (!isValidText(homeTown)) {
        alert("Enter your Home Town correctly !!");
        isValid = false;
    }

    // --- Purpose validation ---
    if (!isValidText(purpose)) {
        alert("Enter your Purpose for scheduling !!");
        isValid = false;
    }

    // --- Category (radio) validation ---
    if (!selectedCategory) {
        alert("Select a category for the appointment !!");
        isValid = false;
    }

    // --- Prevent form submission if any validation fails ---
    if (!isValid) {
        event.preventDefault();
    }
});
