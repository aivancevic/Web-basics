// Prikaži/sakrij shopping menu s desne strane dodavanjem/brisanjem klase "active"
document.getElementById("shopping").addEventListener("click", () => {
  document.getElementById("shopping-side-menu").classList.toggle("active");
});

// Dodaj klik "slušač" na crvene button-e za narudžbe pizza
const buttons = document.querySelectorAll("#pizze button.red");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onOrderButtonClick);
}

// Poziva se na klik crvenog button-a
function onOrderButtonClick(event) {
  const clickedButtonElement = event.currentTarget; // Dohvaćanje kliknutog elementa
  const articleElement = clickedButtonElement.parentElement; // Dohvati "roditelj element" od kliknutnog elementa

  const pizzaName = articleElement.querySelector("h3").innerText;
  const pizzaPrice = articleElement.querySelector("small em").innerText;

  // *** Zadatak 2: ***
  const pizzaCardInShop = document.getElementById(pizzaName.toLowerCase());
  console.log(pizzaCardInShop);
  if (pizzaCardInShop) {
    // Ako već postoji u košarici, inkrementiraj količinu
    const currentAmountElement = pizzaCardInShop.querySelector(".amount");
    let amount = parseInt(currentAmountElement.textContent);
    currentAmountElement.innerText = ++amount;
    pizzaCardInShop.querySelector(".minus").disabled = false;
  } else {
    // Ako ne postoji u košarici, onda kreiraj taj element
    createShopItem(pizzaName, pizzaPrice);
  }

  setCount(); // Uvećaj brojač

  // *** Zadatak 3: ***
  calculateTotalPrice();
}

let counter = 0;
document.getElementById("shopping-count").innerText = counter;

function setCount() {
  // counter++
  let totalCount = 0;
  const allPizzasInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < allPizzasInShop.length; i++) {
    const pizzaInShop = allPizzasInShop[i];
    const amount = pizzaInShop.querySelector(".amount").textContent;
    totalCount += +amount;
  }
  document.getElementById("shopping-count").innerText = totalCount;
}

// Funkcija koja kreira pizza "karticu" u košarici prema imenu i cijeni pizze
function createShopItem(name, price) {
  const shopItem = document.createElement("article"); // Prvo kreiraj prazan element: <article></article>
  shopItem.classList.add("shopping-item"); // Dodaj mu klasu: <article class="shopping-item"></article>
  // *** Zadatak 1: ***
  shopItem.id = name.toLowerCase(); //<article class="shopping-item" id="margherita"></article>


  // Ubaci u <article> element ostale HTML elemente
  shopItem.innerHTML = `
    <i class="fas fa-times close"></i>
    <h3>${name}</h3>
    <div class="item-info">
      <small>Cijena:</small>
      <strong class="price">${price}</strong>
    </div>
    <div class="item-info">
      <small>Količina:</small>
      <div class="amount-box">
        <button class="minus" disabled><i class="fas fa-minus"></i></button>
        <strong class="amount">1</strong>
        <button class="plus"><i class="fas fa-plus"></i></button>
      </div>
    </div>`;

  // Dodaj novokreirani <article> element (sa svim svojim sadržajem) unutar "#shopping-items" elementa
  document.getElementById("shopping-items").append(shopItem);

  // *** Zadatak 4 ***
  shopItem.querySelector(".close").addEventListener("click", onDeleteShopItem);

  // *** Zadatak 5 ***
  shopItem.querySelector(".plus").addEventListener("click", onPlusClick);

  // *** Zadatak 6 ***
  shopItem.querySelector(".minus").addEventListener("click", onMinusClick);
}

// *** Zadatak 3 ***
function calculateTotalPrice() {
  let totalPrice = 0;
  const allPizzasInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < allPizzasInShop.length; i++) {
    const pizzaInShop = allPizzasInShop[i];

    // Dohvati cijenu i količinu pizze te ih pomnoži
    const amount = pizzaInShop.querySelector(".amount").textContent;
    const price = pizzaInShop.querySelector(".price").textContent;
    const onlyPrice = price.split(" ")[0]; // Prvo razdvoji prema razmaku, pa uzmi samo broj/cijenu pizze (prvi element niza)

    const umnozak = parseInt(amount) * parseFloat(onlyPrice);

    totalPrice += umnozak;
  }

  document.querySelector("#total-price strong").innerText = totalPrice.toFixed(2) + " kn";
}

// *** Zadatak 4 ***
function onDeleteShopItem(event) {
  const clickedX = event.currentTarget;
  const itemInShop = clickedX.parentElement;
  itemInShop.remove(); // Brisanje HTML elementa

  calculateTotalPrice(); // Ponovno racunaj ukupnu cijenu
  setCount();
}

// *** Zadatak 5 ***
function onPlusClick(event) {
  const clickedPlus = event.currentTarget;
  const itemInShop = clickedPlus.parentElement;
  let amount = parseInt(itemInShop.querySelector(".amount").textContent);

  amount += 1;

  itemInShop.querySelector(".amount").textContent = amount;
  itemInShop.querySelector(".minus").disabled = false;
  calculateTotalPrice(); // Ponovno racunaj ukupnu cijenu
  setCount();
}

// *** Zadatak 6 ***
function onMinusClick(event) {
  const clickedMinus = event.currentTarget;
  const itemInShop = clickedMinus.parentElement;
  let amount = parseInt(itemInShop.querySelector(".amount").textContent);

  if (amount - 1 > 1) {
    amount -= 1;
    itemInShop.querySelector(".amount").textContent = amount;
  }
  else if (amount - 1 == 1) {
    amount -= 1;
    itemInShop.querySelector(".amount").textContent = amount;
    itemInShop.querySelector(".minus").disabled = true;
  }
  calculateTotalPrice(); // Ponovno racunaj ukupnu cijenu
  setCount();
}