// Your code here

const baseUrl = " http://localhost:3000/characters";


//Fetch the character names
function fetchCharacterName () {
    return fetch(baseUrl)
    .then(response => response.json())
}

function characterNames(character) {
    const divContainer = document.getElementById("character-bar");
    const spanCharacter = document.createElement("span");
    spanCharacter.innerHTML = character.name;
    divContainer.appendChild(spanCharacter);
    spanCharacter.dataset.id = character.id;
    spanCharacter.addEventListener("click", onSpanCharacterClick);
};

fetchCharacterName().then(characters => {
    characters.forEach(character => {
        characterNames(character);
    })
})


//Fetching the character details
function fetchCharacterDetails (id) {
    return fetch(baseUrl + `/${id}`)
    .then(response => response.json())
}


function onSpanCharacterClick (event) {
    fetchCharacterDetails(event.target.dataset.id)
    .then(characterDetails);
}

function characterDetails(character) {
    const characterInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    characterName.innerText = character.name

    const characterImg = document.getElementById("image");
    characterImg.src = character.image

    const characterVotes = document.getElementById("vote-count");
    characterVotes.innerText = character.votes

}

//Form Submission and key in votes
document.getElementById("votes-form").addEventListener("submit", (event) => {
    event.preventDefault(); 
    const votesForm = event.target;
    const votes = document.getElementById("vote-count")
    votes.innerText = parseInt(votesForm.votes.value) + parseInt(votes.innerText);
    votesForm.reset();
})

//Reset Button 
document.getElementById("reset-btn").addEventListener("click", () => {
    document.getElementById("vote-count").innerText = 0;
})

document.addEventListener("DOMContentLoaded", function () {
    fetchCharacterName();
    fetchCharacterDetails();
})