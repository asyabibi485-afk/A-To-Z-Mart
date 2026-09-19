const products = [

  {
    id: 1,
    name: "Luxury Handbag",
    category: "Fashion",
    price: 5499,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 2,
    name: "Silk Scarf",
    category: "Fashion",
    price: 1999,
    image: "https://images.pexels.com/photos/959314/pexels-photo-959314.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 3,
    name: "Elegant Necklace",
    category: "Jewellery",
    price: 3499,
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 4,
    name: "Elegant Bracelet",
    category: "Jewellery",
    price: 2499,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 5,
    name: "Gold Watch",
    category: "Accessories",
    price: 7999,
    image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 6,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 2999,
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 7,
    name: "Premium Makeup Set",
    category: "Beauty",
    price: 4499,
    image: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 8,
    name: "Luxury Abaya",
    category: "Clothes",
    price: 4999,
    image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 9,
    name: "Premium Lawn Suit",
    category: "Clothes",
    price: 3999,
    image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 10,
    name: "Elegant Evening Dress",
    category: "Clothes",
    price: 5999,
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 11,
    name: "Classic Casual Kurti",
    category: "Clothes",
    price: 2499,
    image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 12,
    name: "Luxury Rose Perfume",
    category: "Perfume",
    price: 2999,
    image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 13,
    name: "Royal Oud Perfume",
    category: "Perfume",
    price: 4499,
    image: "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg?auto=compress&cs=tinysrgb&w=900"
  },

  {
    id: 14,
    name: "Vanilla Dream Perfume",
    category: "Perfume",
    price: 2799,
    image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=900"
  }

];


let cart =
  JSON.parse(
    localStorage.getItem("atz_cart") || "[]"
  );


let favorites =
  JSON.parse(
    localStorage.getItem("atz_favorites") || "[]"
  );


let currentPage = 1;

const pageSize = 4;


const productGrid =
  document.getElementById("productGrid");


const favoriteGrid =
  document.getElementById("favoriteGrid");


const cartContent =
  document.getElementById("cartContent");


const searchInput =
  document.getElementById("searchInput");


const categoryFilter =
  document.getElementById("categoryFilter");


const pageInfo =
  document.getElementById("pageInfo");


const prevBtn =
  document.getElementById("prevBtn");


const nextBtn =
  document.getElementById("nextBtn");


const resultText =
  document.getElementById("resultText");


const cartCount =
  document.getElementById("cartCount");


const favoriteCount =
  document.getElementById("favoriteCount");


const toast =
  document.getElementById("toast");


document.getElementById("year").textContent =
  new Date().getFullYear();


function money(value) {

  return "Rs. " +
    Number(value).toLocaleString("en-PK");

}


function saveData() {

  localStorage.setItem(
    "atz_cart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "atz_favorites",
    JSON.stringify(favorites)
  );

  updateCounts();

}


function updateCounts() {

  cartCount.textContent =
    cart.length;

  favoriteCount.textContent =
    favorites.length;

}


function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(
    window.toastTimer
  );

  window.toastTimer =
    setTimeout(
      function() {

        toast.classList.remove(
          "show"
        );

      },
      2200
    );

}


function getFilteredProducts() {

  const search =
    searchInput.value
      .trim()
      .toLowerCase();

  const category =
    categoryFilter.value;


  return products.filter(
    function(product) {

      const matchesSearch =
        !search ||
        product.name
          .toLowerCase()
          .includes(search) ||
        product.category
          .toLowerCase()
          .includes(search);


      const matchesCategory =
        category === "All" ||
        product.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    }
  );

}


function productCard(product) {

  const saved =
    favorites.includes(
      product.id
    );


  return `

    <article class="product-card">

      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.src='https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=900';"
      >

      <div class="product-body">

        <h3>
          ${product.name}
        </h3>

        <div class="category">
          ${product.category}
        </div>

        <div class="price">
          ${money(product.price)}
        </div>

        <div class="card-actions">

          <button
            class="add-button"
            onclick="addToCart(${product.id})">
            Add to Cart
          </button>

          <button
            class="favorite-button ${saved ? "saved" : ""}"
            onclick="toggleFavorite(${product.id})">
            ${saved ? "♥" : "♡"}
          </button>

        </div>

      </div>

    </article>

  `;

}


function renderProducts() {

  const list =
    getFilteredProducts();


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        list.length /
        pageSize
      )
    );


  if (
    currentPage >
    totalPages
  ) {

    currentPage =
      totalPages;

  }


  const start =
    (currentPage - 1) *
    pageSize;


  const visible =
    list.slice(
      start,
      start + pageSize
    );


  if (!visible.length) {

    productGrid.innerHTML = `

      <div class="empty">

        <h2>
          No products found
        </h2>

        <p>
          Try another search
          or category.
        </p>

      </div>

    `;

  } else {

    productGrid.innerHTML =
      visible
        .map(productCard)
        .join("");

  }


  resultText.textContent =
    list.length +
    (
      list.length === 1
        ? " product"
        : " products"
    );


  pageInfo.textContent =
    "Page " +
    currentPage +
    " of " +
    totalPages;


  prevBtn.disabled =
    currentPage <= 1;


  nextBtn.disabled =
    currentPage >= totalPages;


  prevBtn.style.opacity =
    prevBtn.disabled
      ? "0.5"
      : "1";


  nextBtn.style.opacity =
    nextBtn.disabled
      ? "0.5"
      : "1";

}


function renderFavorites() {

  const savedProducts =
    products.filter(
      function(product) {

        return favorites.includes(
          product.id
        );

      }
    );


  if (!savedProducts.length) {

    favoriteGrid.innerHTML = `

      <div class="empty">

        <h2>
          No favorites yet
        </h2>

        <p>
          Tap the heart on a
          product to save it.
        </p>

      </div>

    `;

    return;

  }


  favoriteGrid.innerHTML =
    savedProducts
      .map(productCard)
      .join("");

}


function renderCart() {

  if (!cart.length) {

    cartContent.innerHTML = `

      <div class="empty">

        <h2>
          Your cart is empty
        </h2>

        <p>
          Add products from
          our collection.
        </p>

        <button
          class="hero-button"
          onclick="showPage('shop')">
          Explore Collection
        </button>

      </div>

    `;

    return;

  }


  const items =
    cart.map(
      function(id) {

        return products.find(
          function(product) {

            return product.id === id;

          }
        );

      }
    ).filter(Boolean);


  const total =
    items.reduce(
      function(sum, item) {

        return sum + item.price;

      },
      0
    );


  cartContent.innerHTML = `

    <div class="cart-list">

      ${
        items.map(
          function(item, index) {

            return `

              <div class="cart-row">

                <img
                  class="cart-image"
                  src="${item.image}"
                  alt="${item.name}"
                >

                <div>

                  <h3>
                    ${item.name}
                  </h3>

                  <div class="category">
                    ${item.category}
                  </div>

                </div>

                <div class="price">
                  ${money(item.price)}
                </div>

                <button
                  class="remove-button"
                  onclick="removeFromCart(${index})">
                  Remove
                </button>

              </div>

            `;

          }
        ).join("")
      }

    </div>


    <div class="cart-summary">

      <div class="total">

        <span>
          Total
        </span>

        <span>
          ${money(total)}
        </span>

      </div>


      <form
        id="checkoutForm"
        class="checkout-form">

        <input
          id="customerName"
          type="text"
          placeholder="Full name"
          required
        >

        <input
          id="customerPhone"
          type="tel"
          placeholder="Phone number"
          required
        >

        <textarea
          id="customerAddress"
          rows="4"
          placeholder="Delivery address"
          required>
        </textarea>

        <button
          class="add-button"
          type="submit">
          PLACE ORDER
        </button>

      </form>

      <p id="orderStatus"></p>

    </div>

  `;


  document
    .getElementById(
      "checkoutForm"
    )
    .addEventListener(
      "submit",
      placeOrder
    );

}


function addToCart(id) {

  cart.push(id);

  saveData();

  showToast(
    "Added to cart 🛍️"
  );

}


function removeFromCart(index) {

  cart.splice(
    index,
    1
  );

  saveData();

  renderCart();

}


function toggleFavorite(id) {

  if (
    favorites.includes(id)
  ) {

    favorites =
      favorites.filter(
        function(item) {

          return item !== id;

        }
      );

    showToast(
      "Removed from favorites"
    );

  } else {

    favorites.push(id);

    showToast(
      "Added to favorites ♥"
    );

  }


  saveData();

  renderProducts();

  renderFavorites();

}


function placeOrder(event) {

  event.preventDefault();


  const name =
    document
      .getElementById(
        "customerName"
      )
      .value
      .trim();


  const phone =
    document
      .getElementById(
        "customerPhone"
      )
      .value
      .trim();


  const address =
    document
      .getElementById(
        "customerAddress"
      )
      .value
      .trim();


  const orders =
    JSON.parse(
      localStorage.getItem(
        "atz_orders"
      ) || "[]"
    );


  const order = {

    id:
      "ATZ-" +
      Date.now(),

    name:
      name,

    phone:
      phone,

    address:
      address,

    products:
      cart.map(
        function(id) {

          return products.find(
            function(product) {

              return product.id === id;

            }
          );

        }
      ).filter(Boolean),

    createdAt:
      new Date().toISOString()

  };


  orders.push(order);


  localStorage.setItem(
    "atz_orders",
    JSON.stringify(orders)
  );


  cart = [];


  saveData();


  renderCart();


  showToast(
    "Order placed successfully 🎉"
  );

}


function showPage(page) {

  document
    .querySelectorAll(".page")
    .forEach(
      function(section) {

        section.classList.remove(
          "active"
        );

      }
    );


  document
    .getElementById(
      page + "Page"
    )
    .classList.add(
      "active"
    );


  document
    .querySelectorAll(
      ".nav-btn"
    )
    .forEach(
      function(button) {

        button.classList.toggle(
          "active",
          button.dataset.page === page
        );

      }
    );


  if (
    page === "shop"
  ) {

    renderProducts();

  }


  if (
    page === "favorites"
  ) {

    renderFavorites();

  }


  if (
    page === "cart"
  ) {

    renderCart();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


document
  .querySelectorAll(
    "[data-page]"
  )
  .forEach(
    function(button) {

      button.addEventListener(
        "click",
        function() {

          showPage(
            button.dataset.page
          );

        }
      );

    }
  );


document
  .getElementById(
    "exploreBtn"
  )
  .addEventListener(
    "click",
    function() {

      showPage("shop");

      document
        .getElementById(
          "collection"
        )
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );


searchInput.addEventListener(
  "input",
  function() {

    currentPage = 1;

    renderProducts();

  }
);


categoryFilter.addEventListener(
  "change",
  function() {

    currentPage = 1;

    renderProducts();

  }
);


prevBtn.addEventListener(
  "click",
  function() {

    if (
      currentPage > 1
    ) {

      currentPage--;

      renderProducts();

    }

  }
);


nextBtn.addEventListener(
  "click",
  function() {

    const totalPages =
      Math.max(
        1,
        Math.ceil(
          getFilteredProducts()
            .length /
          pageSize
        )
      );


    if (
      currentPage <
      totalPages
    ) {

      currentPage++;

      renderProducts();

    }

  }
);


document
  .getElementById(
    "contactForm"
  )
  .addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const name =
        document
          .getElementById(
            "contactName"
          )
          .value
          .trim();


      const email =
        document
          .getElementById(
            "contactEmail"
          )
          .value
          .trim();


      const message =
        document
          .getElementById(
            "contactMessage"
          )
          .value
          .trim();


      const subject =
        encodeURIComponent(
          "A To Z Mart enquiry from " +
          name
        );


      const body =
        encodeURIComponent(
          "Name: " +
          name +
          "\nEmail: " +
          email +
          "\n\n" +
          message
        );


      window.location.href =
        "mailto:asyabibi485@gmail.com" +
        "?subject=" +
        subject +
        "&body=" +
        body;

    }
  );


updateCounts();

renderProducts();
