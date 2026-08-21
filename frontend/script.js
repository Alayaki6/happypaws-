/* =========================================
   HAPPYPAWS
   FRONTEND JAVASCRIPT
========================================= */


/* =========================================
   PRODUCTS
========================================= */

const products = [
  {
    id: 1,
    name: "Premium Dog Bed",
    category: "Dog",
    price: 49.99,
    icon: "🛏️",
    description:
      "A soft and comfortable bed designed for everyday rest."
  },

  {
    id: 2,
    name: "Interactive Dog Toy",
    category: "Dog",
    price: 19.99,
    icon: "🎾",
    description:
      "A fun interactive toy designed to keep dogs active."
  },

  {
    id: 3,
    name: "Cat Comfort Bed",
    category: "Cat",
    price: 39.99,
    icon: "🐱",
    description:
      "A cozy resting space made for comfortable cat naps."
  },

  {
    id: 4,
    name: "Cat Play Toy",
    category: "Cat",
    price: 14.99,
    icon: "🧶",
    description:
      "A playful toy designed to keep cats entertained."
  },

  {
    id: 5,
    name: "Pet Grooming Kit",
    category: "Grooming",
    price: 24.99,
    icon: "✨",
    description:
      "Everyday grooming essentials for keeping your pet comfortable."
  },

  {
    id: 6,
    name: "Premium Pet Food Bowl",
    category: "Food",
    price: 17.99,
    icon: "🥣",
    description:
      "A durable feeding bowl suitable for everyday use."
  }
];


/* =========================================
   CART
========================================= */

let cart = [];

try {

  const savedCart =
    localStorage.getItem("happypaws_cart");

  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

} catch (error) {

  console.error(
    "Unable to load saved cart.",
    error
  );

}


/* =========================================
   DOM ELEMENTS
========================================= */

const productGrid =
  document.getElementById(
    "productGrid"
  );

const cartPanel =
  document.getElementById(
    "cartPanel"
  );

const cartOverlay =
  document.getElementById(
    "cartOverlay"
  );

const cartItems =
  document.getElementById(
    "cartItems"
  );

const cartTotal =
  document.getElementById(
    "cartTotal"
  );

const closeCart =
  document.getElementById(
    "closeCart"
  );

const menuToggle =
  document.getElementById(
    "menuToggle"
  );

const navLinks =
  document.querySelector(
    ".nav-links"
  );

const checkoutButton =
  document.getElementById(
    "checkoutButton"
  );

const supportButton =
  document.getElementById(
    "supportButton"
  );


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD"
    }
  ).format(price);

}


/* =========================================
   SAVE CART
========================================= */

function saveCart() {

  localStorage.setItem(
    "happypaws_cart",
    JSON.stringify(cart)
  );

}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(
  category = "all"
) {

  if (!productGrid) {
    return;
  }


  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) =>
            product.category === category
        );


  if (
    filteredProducts.length === 0
  ) {

    productGrid.innerHTML = `

      <div class="empty-products">

        <h3>
          No products found
        </h3>

        <p>
          Check another category.
        </p>

      </div>

    `;

    return;

  }


  productGrid.innerHTML =
    filteredProducts
      .map(
        (product) => `

          <article
            class="product-card"
          >

            <div
              class="product-image"
              aria-label="${product.name}"
            >
              ${product.icon}
            </div>


            <div
              class="product-content"
            >

              <p
                class="product-category"
              >
                ${product.category}
              </p>


              <h3>
                ${product.name}
              </h3>


              <p
                class="product-description"
              >
                ${product.description}
              </p>


              <div
                class="product-footer"
              >

                <strong
                  class="product-price"
                >
                  ${formatPrice(product.price)}
                </strong>


                <button
                  class="add-to-cart"
                  type="button"
                  data-product-id="${product.id}"
                >
                  Add to cart
                </button>

              </div>

            </div>

          </article>

        `
      )
      .join("");


  const addButtons =
    document.querySelectorAll(
      ".add-to-cart"
    );


  addButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const productId =
            Number(
              button.dataset.productId
            );

          addToCart(productId);

        }
      );

    }
  );

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

  const product =
    products.find(
      (item) =>
        item.id === productId
    );


  if (!product) {
    return;
  }


  const existingItem =
    cart.find(
      (item) =>
        item.id === productId
    );


  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });

  }


  saveCart();

  renderCart();

  openCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(
  productId
) {

  cart =
    cart.filter(
      (item) =>
        item.id !== productId
    );


  saveCart();

  renderCart();

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(
  productId,
  amount
) {

  const item =
    cart.find(
      (cartItem) =>
        cartItem.id === productId
    );


  if (!item) {
    return;
  }


  item.quantity += amount;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        (cartItem) =>
          cartItem.id !== productId
      );

  }


  saveCart();

  renderCart();

}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

  if (
    !cartItems ||
    !cartTotal
  ) {
    return;
  }


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <p>
        Your cart is empty.
      </p>

    `;

    cartTotal.textContent =
      "$0.00";

    return;

  }


  cartItems.innerHTML =
    cart
      .map(
        (item) => `

          <div
            class="cart-item"
          >

            <div>

              <h4>
                ${item.name}
              </h4>

              <p>
                ${formatPrice(item.price)}
                × ${item.quantity}
              </p>

              <div
                class="cart-quantity"
              >

                <button
                  type="button"
                  data-action="decrease"
                  data-id="${item.id}"
                >
                  −
                </button>

                <span>
                  ${item.quantity}
                </span>

                <button
                  type="button"
                  data-action="increase"
                  data-id="${item.id}"
                >
                  +
                </button>

              </div>

            </div>


            <button
              class="remove-cart-item"
              type="button"
              data-action="remove"
              data-id="${item.id}"
            >
              Remove
            </button>

          </div>

        `
      )
      .join("");


  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );


  cartTotal.textContent =
    formatPrice(total);


  const cartActionButtons =
    cartItems.querySelectorAll(
      "[data-action]"
    );


  cartActionButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(
              button.dataset.id
            );

          const action =
            button.dataset.action;


          if (
            action === "remove"
          ) {

            removeFromCart(id);

          }


          if (
            action === "increase"
          ) {

            changeQuantity(
              id,
              1
            );

          }


          if (
            action === "decrease"
          ) {

            changeQuantity(
              id,
              -1
            );

          }

        }
      );

    }
  );

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

  if (!cartPanel) {
    return;
  }


  cartPanel.classList.add(
    "open"
  );


  cartPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  if (cartOverlay) {

    cartOverlay.classList.add(
      "active"
    );

  }

}


/* =========================================
   CLOSE CART
========================================= */

function closeCartPanel() {

  if (!cartPanel) {
    return;
  }


  cartPanel.classList.remove(
    "open"
  );


  cartPanel.setAttribute(
    "aria-hidden",
    "true"
  );


  if (cartOverlay) {

    cartOverlay.classList.remove(
      "active"
    );

  }

}


/* =========================================
   CATEGORY FILTERS
========================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );


filterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(
          (item) => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        displayProducts(
          button.dataset.filter
        );

      }
    );

  }
);


/* =========================================
   CATEGORY CARDS
========================================= */

const categoryCards =
  document.querySelectorAll(
    ".category-card"
  );


categoryCards.forEach(
  (card) => {

    card.addEventListener(
      "click",
      () => {

        const category =
          card.dataset.category;


        if (!category) {
          return;
        }


        filterButtons.forEach(
          (button) => {

            button.classList.toggle(
              "active",
              button.dataset.filter ===
                category
            );

          }
        );


        displayProducts(
          category
        );

      }
    );

  }
);


/* =========================================
   MOBILE NAVIGATION
========================================= */

if (
  menuToggle &&
  navLinks
) {

  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navLinks.classList.toggle(
          "active"
        );


      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  navLinks
    .querySelectorAll("a")
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove(
              "active"
            );


            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );

}


/* =========================================
   CART CLOSE BUTTON
========================================= */

if (closeCart) {

  closeCart.addEventListener(
    "click",
    closeCartPanel
  );

}


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    closeCartPanel
  );

}


/* =========================================
   CHECKOUT
========================================= */

if (checkoutButton) {

  checkoutButton.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        alert(
          "Your cart is empty."
        );

        return;

      }


      /*
        REAL PAYMENT PROCESSING
        WILL BE CONNECTED LATER.

        We will eventually connect
        this button to a secure
        server-side checkout system.
      */

      alert(
        "Checkout will be available once secure payment processing is connected."
      );

    }
  );

}


/* =========================================
   SUPPORT
========================================= */

if (supportButton) {

  supportButton.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      alert(
        "HappyPaws support will be connected to the automated customer support system."
      );

    }
  );

}


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeCartPanel();

    }

  }
);


/* =========================================
   INITIALIZE
========================================= */

displayProducts();

renderCart();
