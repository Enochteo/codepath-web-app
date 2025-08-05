/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/
let count = 3; // Starting count
let dark = false;
// Step 1: Select the theme button
const themeButton = document.getElementById("theme-button");

const submitButton = document.getElementById('rsvp-button');
// Step 2: Write the callback function
const toggleDarkMode = () => {
    // Write your code here
    // This section will run whenever the button is clicked
    if (dark == false){
    document.body.classList.add('dark-mode');
    dark = true;}
    else {
      document.body.classList.remove('dark-mode');
      dark = false;
    }
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener('click', toggleDarkMode);
/*** Form Validation [PLACEHOLDER] [ADDED IN UNIT 7] ***/
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  const rsvpInputs = document.getElementById("rsvp-form").elements;
  let person = {
    name: rsvpInputs[0].value, // accesses and saves value of first input
    // add more properties here
    email: rsvpInputs[1].value,
    state: rsvpInputs[2].value
  }
  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];

    // Skip the button
    if (input.tagName === "BUTTON") continue;

    // Stretch feature: email must contain "@"
    if (
      input.id === "email" &&
      (!input.value.includes("@") || input.value.length < 2)
    ) {
      input.classList.add("error");
      containsErrors = true;
    } 
    // Required feature: all fields must be >= 2 characters
    else if (input.value.length < 2) {
      input.classList.add("error");
      containsErrors = true;
    } 
    else {
      input.classList.remove("error");
    }
  }

  // If valid, add participant and clear fields
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);
    for (let i = 0; i < rsvpInputs.length; i++) {
      if (rsvpInputs[i].tagName !== "BUTTON") {
        rsvpInputs[i].value = "";
      }
    }
  }
};
/*** Form Handling [PLACEHOLDER] [ADDED IN UNIT 6] ***/
const addParticipant = (event, person) => {
    // Step 2: Write your code to manipulate the DOM here
    const nameInput = document.getElementById("name"); // ID of name input
    const stateInput = document.getElementById("state"); // ID of another detail (like state)

    const name = nameInput.value;
    const state = stateInput.value;

    // Step 3b: Create a new <p> element
    const newParticipant = document.createElement("p");
newParticipant.textContent = `🎟️ ${name} from ${state} has RSVP'd.`;

    // Step 3c: Find the participants div and append
    const participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParticipant);

    count = count + 1;

    const rsvpCount = document.getElementById("rsvp-count");
    rsvpCount.textContent = count + " people have RSVP'd to this event!";}
// submitButton.addEventListener("click", addParticipant);
submitButton.addEventListener("click", validateForm)
/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
let rotateFactor = 0;
let modalImage = document.getElementById('modal-image');
const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = 10;
  }
  else {
    rotateFactor = 0;
  }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/
const toggleModal = (person) => {
    let modal = document.getElementById('success-modal'); // TODO
    let modalContent = document.getElementById('modal-text')
    // TODO: Update modal display to flex
    modal.style.display = "flex";

    // TODO: Update modal text to personalized message
    modalContent.textContent = `Thank's for RSVPing, ${person.name}! We can't wait to see you at the event!`

    // Set modal timeout to 5 seconds
    let intervalId = setInterval((animateImage), 500);
    setTimeout(() => {
      modal.style.display = 'none';
      clearInterval(intervalId);
    }, 5000);

}
