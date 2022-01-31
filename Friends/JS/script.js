//Dodavanje slušača na botune za odabir glumaca
const buttons = document.querySelectorAll("#cards .card__button");
let counterNumber = 0;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", onOrderButtonClick);
}
//Funkcija koja se poziva na klik botuna
function onOrderButtonClick(event) {
    const clickedButtonElement = event.currentTarget;
    const articleElement = clickedButtonElement.parentElement;

    const actorName = articleElement.querySelector("h3").innerText;

    if (actorName) {
        createActorNameElement(actorName);
        articleElement.querySelector(".card__button").disabled = true;
        count();
    }
}
//Funkcija koja stvara ime glumca u "odabrano"
function createActorNameElement(name) {
    const nameElement = document.createElement("article");
    nameElement.classList.add("tag");

    nameElement.innerHTML = `<span class="tag__name">${name}</span>
        <i class="fas fa-times tag__close"></i>`

    document.getElementById("tags").append(nameElement);
    nameElement.querySelector(".tag__close").addEventListener("click", onCloseClick);
    counterNumber++;
    count();
}
//Funkcija koja brise ime glumca iz "odabrano"
function onCloseClick(event) {
    const clickedX = event.currentTarget;
    const articleElement = clickedX.parentElement;
    const articleElementName = articleElement.querySelector(".tag__name").innerText;
    let clickedButton = 0;

    for (let i = 0; i < buttons.length; i++) {
        if (articleElementName == buttons[i].parentElement.querySelector(".card__name").innerText) {
            clickedButton = buttons[i].parentElement.querySelector(".card__button");
        }
    }
    clickedButton.disabled = false;
    articleElement.remove();
    counterNumber--;
    count();
}
//Funkcija za ispis ukupnog broja odabranih prijatelja
function count() {
    const counterElement = document.getElementById("counter");
    counterElement.innerHTML = counterNumber.toString();
}