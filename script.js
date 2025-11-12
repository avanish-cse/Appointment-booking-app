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
let formCloseBtn = document.querySelector("#form-close-button");

addBtn.addEventListener("click", () => {
    noteContainer.classList.add("hidden");
    formContainer.classList.remove("hidden");
});

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
// Validation Functions
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
// Local Storage Functions
// -----------------------------
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveToLocalStorage(obj) {
    let oldTasks = getTasks();
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

function removeFromLocalStorage(name) {
    let tasks = getTasks().filter(task => task.fullName !== name);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// -----------------------------
// Create & Display Cards
// -----------------------------
function showCard(name, homeTown, bookings, imageUrl) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const card = document.createElement('div');
    card.classList.add('card');
    cardContainer.appendChild(card);

    // --- Profile section ---
    const profile = document.createElement('div');
    profile.classList.add('profile');

    const avatar = document.createElement('div');
    avatar.classList.add('avatar');

    const img = document.createElement('img');
    img.src = imageUrl || 'default-avatar.jpg';
    img.alt = `${name}'s Avatar`;
    img.onerror = () => { img.src = 'default-avatar.jpg'; };
    avatar.appendChild(img);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.textContent = name;

    profile.appendChild(avatar);
    profile.appendChild(nameDiv);
    card.appendChild(profile);

    // --- Home Town info ---
    const homeInfo = document.createElement('div');
    homeInfo.classList.add('info');
    homeInfo.innerHTML = `<span>Home town</span><span>${homeTown}</span>`;
    card.appendChild(homeInfo);

    // --- Bookings info ---
    const bookingsInfo = document.createElement('div');
    bookingsInfo.classList.add('info');
    bookingsInfo.innerHTML = `<span>Bookings</span><span>${bookings}</span>`;
    card.appendChild(bookingsInfo);

    // --- Action buttons ---
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const callBtn = document.createElement('button');
    callBtn.classList.add('btn', 'call');
    callBtn.textContent = '📞 Call';

    const messageBtn = document.createElement('button');
    messageBtn.classList.add('btn', 'message');
    messageBtn.textContent = 'Message';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete');
    deleteBtn.textContent = '🗑 Delete';
    deleteBtn.addEventListener('click', () => {
        removeFromLocalStorage(name);
        cardContainer.remove();
    });

    buttonsDiv.append(callBtn, messageBtn, deleteBtn);
    card.appendChild(buttonsDiv);

    return cardContainer;
}

function renderAllCards() {
    // noteContainer.innerHTML = ""; // clear old cards
    const tasks = getTasks();
    tasks.forEach(task => {
        const card = showCard(task.fullName, task.homeTown, task.category, task.imageUrl);
        noteContainer.appendChild(card);
    });
}

// -----------------------------
// Form Submission
// -----------------------------
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let imgUrl = document.querySelector("#image-url").value.trim();
    let fullName = document.querySelector("#full-name").value.trim();
    let homeTown = document.querySelector("#home-town").value.trim();
    let purpose = document.querySelector("#purpose").value.trim();
    let selectedCategory = document.querySelector('input[name="category"]:checked');

    let isValid = true;

    if (!isValidImageUrl(imgUrl)) {
        alert("Enter a valid Image URL!");
        isValid = false;
    }
    if (!isValidName(fullName)) {
        alert("Enter a valid Name!");
        isValid = false;
    }
    if (!isValidText(homeTown)) {
        alert("Enter your Home Town correctly!");
        isValid = false;
    }
    if (!isValidText(purpose)) {
        alert("Enter your Purpose for scheduling!");
        isValid = false;
    }
    if (!selectedCategory) {
        alert("Select a category for the appointment!");
        isValid = false;
    }

    if (!isValid) return;

    // Save to Local Storage
    const newTask = {
        imageUrl: imgUrl,
        fullName: fullName,
        homeTown: homeTown,
        purpose: purpose,
        category: selectedCategory.value
    };
    saveToLocalStorage(newTask);

    // Reset and show card view
    form.reset();
    formContainer.classList.add("hidden");
    noteContainer.classList.remove("hidden");

    // Re-render cards
    renderAllCards();
});

// -----------------------------
// Show saved cards on page load
// -----------------------------
window.addEventListener("DOMContentLoaded", renderAllCards);
