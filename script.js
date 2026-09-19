/* =========================================================
   A TO Z MART
   Main JavaScript
   ========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
   =========================================================

   IMPORTANT:

   Replace these two values with your own Supabase project
   URL and PUBLIC ANON KEY.

   DO NOT put your Supabase SERVICE_ROLE KEY here.

   Example:

   const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
   const SUPABASE_ANON_KEY = "eyJhbGciOi...";

   ========================================================= */

const SUPABASE_URL = "YOUR_SUPABASE_URL";

const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


let supabaseClient = null;


if (
  window.supabase &&
  SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
) {

  supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );

}


/* =========================================================
   ADMIN EMAIL
   ========================================================= */

const ADMIN_EMAIL = "asyabibi485@gmail.com";


/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [

  {
    id: 1,
    name: "Luxury Handbag",
    category: "Fashion",
    price: 5499,
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"
  },

  {
    id: 2,
    name: "Silk Scarf",
    category: "Fashion",
    price: 1999,
    image:
      "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg"
  },

  {
    id: 3,
    name: "Pearl Necklace",
    category: "Jewellery",
    price: 3499,
    image:
      "https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg"
  },

  {
    id: 4,
    name: "Elegant Bracelet",
    category: "Jewellery",
    price: 2499,
    image:
      "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg"
  },

  {
    id: 5,
    name: "Gold Watch",
    category: "Accessories",
    price: 7999,
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
  },

  {
    id: 6,
    name: "Classic Sunglasses",
    category: "Accessories",
    price: 2999,
    image:
      "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg"
  },

  {
    id: 7,
    name: "Premium Makeup Set",
    category: "Beauty",
    price: 4499,
    image:
      "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg"
  },

  {
    id: 8,
    name: "Luxury Abaya",
    category: "Clothes",
    price: 4999,
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
  },

  {
    id: 9,
    name: "Premium Lawn Suit",
    category: "Clothes",
    price: 3999,
    image:
      "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg"
  },

  {
    id: 10,
    name: "Elegant Evening Dress",
    category: "Clothes",
    price: 5999,
    image:
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
  },

  {
    id: 11,
    name: "Classic Casual Kurti",
    category: "Clothes",
    price: 2499,
    image:
      "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg"
  },

  {
    id: 12,
    name: "Luxury Rose Perfume",
    category: "Perfume",
    price: 2999,
    image:
      "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"
  },

  {
    id: 13,
    name: "Royal Oud Perfume",
    category: "Perfume",
    price: 4499,
    image:
      "https://images.pexels.com/photos/1961792/pexels-photo-1961792.jpeg"
  },

  {
    id: 14,
    name: "Vanilla Dream Perfume",
    category: "Perfume",
    price: 2799,
    image:
      "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg"
  }

];


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

let cart =
  JSON.parse(
    localStorage.getItem("atozmart_cart") || "[]"
  );

let favorites =
  JSON.parse(
    localStorage.getItem("atozmart_favorites") || "[]"
  );


/* =========================================================
   PAGINATION
   ========================================================= */

const PAGE_SIZE = 4;

let currentPage = 1;


/* =========================================================
   ELEMENTS
   ========================================================= */

const productGrid =
  document.getElementById("productGrid");

const favoriteGrid =
  document.getElementById("favoriteGrid");

const searchInput =
  document.getElementById("searchInput");

const categoryFilter =
  document.getElementById("categoryFilter");

const previousButton =
  document.getElementById("previousButton");

const nextButton =
  document.getElementById("nextButton");

const pageIndicator =
  document.getElementById("pageIndicator");

const cartPanel =
  document.getElementById("cartPanel");

const cartOverlay =
  document.getElementById("cartOverlay");

const cartItems =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const cartCount =
  document.getElementById("cartCount");

const favoriteCount =
  document.getElementById("favoriteCount");

const cartTopButton =
  document.getElementById("cartTopButton");

const closeCartButton =
  document.getElementById("closeCartButton");

const checkoutBtn =
  document.getElementById("checkoutBtn");

const checkoutModal =
  document.getElementById("checkoutModal");

const closeCheckout =
  document.getElementById("closeCheckout");

const checkoutForm =
  document.getElementById("checkoutForm");

const checkoutTotal =
  document.getElementById("checkoutTotal");

const checkoutMessage =
  document.getElementById("checkoutMessage");

const adminModal =
  document.getElementById("adminModal");

const adminNavButton =
  document.getElementById("adminNavButton");

const closeAdmin =
  document.getElementById("closeAdmin");

const adminLoginForm =
  document.getElementById("adminLoginForm");

const adminLoginMessage =
  document.getElementById("adminLoginMessage");

const adminLoginArea =
  document.getElementById("adminLoginArea");

const adminDashboard =
  document.getElementById("adminDashboard");

const adminLogout =
  document.getElementById("adminLogout");

const ordersList =
  document.getElementById("ordersList");


/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(price) {

  return "Rs. " + Number(price).toLocaleString("en-PK");

}


function saveCart() {

  localStorage.setItem(
    "atozmart_cart",
    JSON.stringify(cart)
  );

}


function saveFavorites() {

  localStorage.setItem(
    "atozmart_favorites",
    JSON.stringify(favorites)
  );

}


function getFilteredProducts() {

  const search =
    searchInput.value
      .trim()
      .toLowerCase();

  const category =
    categoryFilter.value;


  return products.filter(product => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search) ||

      product.category
        .toLowerCase()
        .includes(search);


    const matchesCategory =
      category === "All" ||
      product.category === category;


    return matchesSearch && matchesCategory;

  });

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

  const isFavorite =
    favorites.includes(product.id);


  return `
    <article class="product-card">

      <div class="product-image-wrap">

        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/800x900/f5f0ff/171321?text=A+To+Z+Mart';"
        >

        <button
          class="favorite-button ${isFavorite ? "active" : ""}"
          onclick="toggleFavorite(${product.id})"
          aria-label="Add to favorites"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>

      </div>


      <div class="product-info">

        <div class="product-category">
          ${product.category}
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-price">
          ${formatPrice(product.price)}
        </div>

        <button
          class="add-cart-button"
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>

      </div>

    </article>
  `;

}


/* =========================================================
   RENDER PRODUCTS
   ========================================================= */

function renderProducts() {

  const filteredProducts =
    getFilteredProducts();


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProducts.length /
        PAGE_SIZE
      )
    );


  if (currentPage > totalPages) {
    currentPage = totalPages;
  }


  const start =
    (currentPage - 1) *
    PAGE_SIZE;


  const pageProducts =
    filteredProducts.slice(
      start,
      start + PAGE_SIZE
    );


  if (pageProducts.length === 0) {

    productGrid.innerHTML = `
      <p class="empty-message">
        No products found.
      </p>
    `;

  } else {

    productGrid.innerHTML =
      pageProducts
        .map(createProductCard)
        .join("");

  }


  pageIndicator.textContent =
    `Page ${currentPage} of ${totalPages}`;


  previousButton.disabled =
    currentPage === 1;


  nextButton.disabled =
    currentPage === totalPages;

}


/* =========================================================
   PAGINATION
   ========================================================= */

previousButton.addEventListener(
  "click",
  function() {

    if (currentPage > 1) {

      currentPage--;

      renderProducts();

      document
        .getElementById("shop")
        .scrollIntoView({
          behavior: "smooth"
        });

    }

  }
);


nextButton.addEventListener(
  "click",
  function() {

    const filteredProducts =
      getFilteredProducts();

    const totalPages =
      Math.max(
        1,
        Math.ceil(
          filteredProducts.length /
          PAGE_SIZE
        )
      );


    if (currentPage < totalPages) {

      currentPage++;

      renderProducts();

      document
        .getElementById("shop")
        .scrollIntoView({
          behavior: "smooth"
        });

    }

  }
);


/* =========================================================
   SEARCH / FILTER
   ========================================================= */

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


/* =========================================================
   FAVORITES
   ========================================================= */

function toggleFavorite(productId) {

  const index =
    favorites.indexOf(productId);


  if (index === -1) {

    favorites.push(productId);

  } else {

    favorites.splice(index, 1);

  }


  saveFavorites();

  updateFavoriteCount();

  renderProducts();

  renderFavorites();

}


function updateFavoriteCount() {

  favoriteCount.textContent =
    favorites.length;

}


function renderFavorites() {

  const favoriteProducts =
    products.filter(product =>
      favorites.includes(product.id)
    );


  if (favoriteProducts.length === 0) {

    favoriteGrid.innerHTML = `
      <p class="empty-message">
        You have not added any favorites yet.
      </p>
    `;

    return;

  }


  favoriteGrid.innerHTML =
    favoriteProducts
      .map(createProductCard)
      .join("");

}


/* =========================================================
   CART
   ========================================================= */

function addToCart(productId) {

  cart.push(productId);

  saveCart();

  updateCart();

  openCart();

}


function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();

  updateCart();

}


function getCartTotal() {

  return cart.reduce(
    function(total, productId) {

      const product =
        products.find(
          item => item.id === productId
        );

      return total +
        (product ? product.price : 0);

    },
    0
  );

}


function updateCart() {

  cartCount.textContent =
    cart.length;


  cartTotal.textContent =
    formatPrice(
      getCartTotal()
    );


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-message">
        Your cart is empty.
      </p>
    `;

    return;

  }


  cartItems.innerHTML =
    cart
      .map(
        function(productId, index) {

          const product =
            products.find(
              item =>
                item.id === productId
            );


          if (!product) {
            return "";
          }


          return `
            <div class="cart-item">

              <img
                src="${product.image}"
                alt="${product.name}"
                onerror="this.onerror=null;this.src='https://placehold.co/200x250/f5f0ff/171321?text=Product';"
              >

              <div>

                <div class="cart-item-name">
                  ${product.name}
                </div>

                <div class="cart-item-price">
                  ${formatPrice(product.price)}
                </div>

              </div>

              <button
                class="remove-cart-item"
                onclick="removeFromCart(${index})"
              >
                ×
              </button>

            </div>
          `;

        }
      )
      .join("");

}


function openCart() {

  cartPanel.classList.add("open");

  cartOverlay.classList.add("visible");

}


function closeCart() {

  cartPanel.classList.remove("open");

  cartOverlay.classList.remove("visible");

}


cartTopButton.addEventListener(
  "click",
  openCart
);


closeCartButton.addEventListener(
  "click",
  closeCart
);


cartOverlay.addEventListener(
  "click",
  closeCart
);


/* =========================================================
   CHECKOUT
   ========================================================= */

function openCheckout() {

  if (cart.length === 0) {

    alert(
      "Your cart is empty. Please add a product first."
    );

    return;

  }


  checkoutTotal.textContent =
    formatPrice(
      getCartTotal()
    );


  checkoutMessage.textContent = "";

  checkoutMessage.style.color =
    "#7c3aed";


  checkoutModal.classList.remove(
    "hidden"
  );


  closeCart();

}


function closeCheckoutModal() {

  checkoutModal.classList.add(
    "hidden"
  );

}


checkoutBtn.addEventListener(
  "click",
  openCheckout
);


closeCheckout.addEventListener(
  "click",
  closeCheckoutModal
);


checkoutModal.addEventListener(
  "click",
  function(event) {

    if (
      event.target === checkoutModal
    ) {

      closeCheckoutModal();

    }

  }
);


/* =========================================================
   PLACE ORDER
   ========================================================= */

checkoutForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();


    if (cart.length === 0) {

      checkoutMessage.textContent =
        "Your cart is empty.";

      checkoutMessage.style.color =
        "#dc2626";

      return;

    }


    const customerName =
      document
        .getElementById("customerName")
        .value
        .trim();


    const customerPhone =
      document
        .getElementById("customerPhone")
        .value
        .trim();


    const customerAddress =
      document
        .getElementById("customerAddress")
        .value
        .trim();


    if (
      !customerName ||
      !customerPhone ||
      !customerAddress
    ) {

      checkoutMessage.textContent =
        "Please complete all delivery details.";

      checkoutMessage.style.color =
        "#dc2626";

      return;

    }


    if (!supabaseClient) {

      checkoutMessage.textContent =
        "Supabase is not connected. Add your Supabase URL and anon key in script.js.";

      checkoutMessage.style.color =
        "#dc2626";

      return;

    }


    checkoutMessage.textContent =
      "Placing your order...";

    checkoutMessage.style.color =
      "#7c3aed";


    const totalAmount =
      getCartTotal();


    try {

      /* -----------------------------
         CREATE ORDER
         ----------------------------- */

      const {
        data: order,
        error: orderError
      } =
        await supabaseClient
          .from("orders")
          .insert({

            customer_name:
              customerName,

            customer_phone:
              customerPhone,

            customer_address:
              customerAddress,

            total_amount:
              totalAmount

          })
          .select()
          .single();


      if (orderError) {

        throw orderError;

      }


      /* -----------------------------
         GROUP CART PRODUCTS
         ----------------------------- */

      const quantities = {};


      cart.forEach(
        function(productId) {

          quantities[productId] =
            (quantities[productId] || 0) +
            1;

        }
      );


      /* -----------------------------
         CREATE ORDER ITEMS
         ----------------------------- */

      const orderItems =
        Object.entries(
          quantities
        ).map(
          function([
            productId,
            quantity
          ]) {

            const product =
              products.find(
                item =>
                  item.id ===
                  Number(productId)
              );


            return {

              order_id:
                order.id,

              product_name:
                product.name,

              price:
                product.price,

              quantity:
                quantity

            };

          }
        );


      const {
        error: itemsError
      } =
        await supabaseClient
          .from("order_items")
          .insert(
            orderItems
          );


      if (itemsError) {

        throw itemsError;

      }


      /* -----------------------------
         SUCCESS
         ----------------------------- */

      cart = [];

      saveCart();

      updateCart();

      checkoutForm.reset();


      checkoutMessage.textContent =
        "Order placed successfully! Thank you for shopping with A To Z Mart.";

      checkoutMessage.style.color =
        "#15803d";


      setTimeout(
        function() {

          closeCheckoutModal();

        },
        2500
      );


    } catch (error) {

      console.error(
        "Order error:",
        error
      );


      checkoutMessage.textContent =
        "Order failed: " +
        (
          error.message ||
          "Please try again."
        );


      checkoutMessage.style.color =
        "#dc2626";

    }

  }
);


/* =========================================================
   ADMIN
   ========================================================= */

adminNavButton.addEventListener(
  "click",
  async function() {

    adminModal.classList.remove(
      "hidden"
    );


    if (!supabaseClient) {

      adminLoginMessage.textContent =
        "Supabase is not connected. Add your Supabase URL and anon key in script.js.";

      adminLoginMessage.style.color =
        "#dc2626";

      return;

    }


    const {
      data: sessionData
    } =
      await supabaseClient.auth.getSession();


    if (
      sessionData &&
      sessionData.session &&
      sessionData.session.user
    ) {

      const email =
        
