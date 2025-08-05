
let count = 3; // Starting count
let dark = false;
const themeButton = document.getElementById("theme-button");

const submitButton = document.getElementById('rsvp-button');
const toggleDarkMode = () => {
    if (dark == false){
    document.body.classList.add('dark-mode');
    dark = true;}
    else {
      document.body.classList.remove('dark-mode');
      dark = false;
    }
}

themeButton.addEventListener('click', toggleDarkMode);

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;

  const rsvpInputs = document.getElementById("rsvp-form").elements;
  let person = {
    name: rsvpInputs[0].value, // accesses and saves value of first input
    email: rsvpInputs[1].value,
    state: rsvpInputs[2].value
  }
  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];

    if (input.tagName === "BUTTON") continue;

    if (
      input.id === "email" &&
      (!input.value.includes("@") || input.value.length < 2)
    ) {
      input.classList.add("error");
      containsErrors = true;
    } 

    else if (input.value.length < 2) {
      input.classList.add("error");
      containsErrors = true;
    } 
    else {
      input.classList.remove("error");
    }
  }

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

const addParticipant = (event, person) => {

    const nameInput = document.getElementById("name"); // ID of name input
    const stateInput = document.getElementById("state"); // ID of another detail (like state)

    const name = nameInput.value;
    const state = stateInput.value;

    const newParticipant = document.createElement("p");
newParticipant.textContent = `🎟️ ${name} from ${state} has RSVP'd.`;

    const participantsDiv = document.querySelector(".rsvp-participants");
    participantsDiv.appendChild(newParticipant);

    count = count + 1;

    const rsvpCount = document.getElementById("rsvp-count");
    rsvpCount.textContent = count + " people have RSVP'd to this event!";}
// submitButton.addEventListener("click", addParticipant);
submitButton.addEventListener("click", validateForm)


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


const toggleModal = (person) => {
    let modal = document.getElementById('success-modal'); // TODO
    let modalContent = document.getElementById('modal-text')

    modal.style.display = "flex";

    modalContent.textContent = `Thank's for RSVPing, ${person.name}! We can't wait to see you at the event!`

    let intervalId = setInterval((animateImage), 500);
    setTimeout(() => {
      modal.style.display = 'none';
      clearInterval(intervalId);
    }, 5000);

}
