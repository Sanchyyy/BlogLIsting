const userCardTemplate = document.getElementById("card-template");
const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const loadMore = document.getElementById("load-more");
const searchInput = document.getElementById("search");

let users = [];
let filteredUsers = [];
let currentPage = 1;
const pageSize = 6;

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    users = data.products.map(user => ({
      title: user.title.toLowerCase(),
      category: user.category.toLowerCase(),
      description: user.description,
      image: user.images[0], 
      element: createUserCard(user),
    }));

    filteredUsers = [...users];
    displayUsers();
  })
  .catch(error => console.error('Error:', error));

function createUserCard(user) {
  const card = userCardTemplate.content.cloneNode(true).children[0];
  const imageElement = card.querySelector(".card-image");
  imageElement.src = user.images[0];  
  
  card.querySelector(".card-title").textContent = user.title;
  card.querySelector(".category").textContent = user.category.charAt(0).toUpperCase()+ user.category.slice(1).toLowerCase();
  card.querySelector(".description").textContent = user.description;

  const spritePath = "/apps/wknd/clientlibs/clientlib-site/resources/images/sprite/sprite.svg";

  const downloadIcon = card.querySelector(".download-icon use");
  downloadIcon.setAttribute("href", `${spritePath}#download`);

  const shareIcon = card.querySelector(".share-icon use");
  shareIcon.setAttribute("href", `${spritePath}#share`);

  const arrowIcon = card.querySelector(".arrow-icon use");
  arrowIcon.setAttribute("href", `${spritePath}#arrow`);


  return card
}

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  filteredUsers = users.filter(user =>
    user.title.includes(value) || user.category.includes(value)
  );

  currentPage = 1;
  displayUsers();
});

function displayUsers() {
  cardsContainer.innerHTML = "";

  if (filteredUsers.length === 0) {
    const noUserMessage = document.createElement("p");
    noUserMessage.textContent = "No users found";
    noUserMessage.classList.add("no-user-message");
    cardsContainer.append(noUserMessage);
    return;
  }

  const startIndex = (currentPage-1)*pageSize;
  const endIndex =startIndex+pageSize;
  const paginatedUsers = filteredUsers.slice(0, endIndex);

  paginatedUsers.forEach(user => {
    cardsContainer.append(user.element);
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  loadMore.disabled = currentPage >= totalPages;
}



loadMore.addEventListener("click", () => {
  if (currentPage * pageSize < filteredUsers.length) {
    currentPage++;
    displayUsers();
  }
});

