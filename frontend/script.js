/* =========================================
   HAPPYPAWS MAIN SCRIPT
========================================= */

const productGrid =
  document.getElementById("productGrid");

let allProducts = [];

let cart =
  JSON.parse(
    localStorage.getItem("happypaws_cart")
  ) || [];



/* =========================================
   FORMAT MONEY
========================================= */

function formatMoney(amount) {

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD"
    }
  ).format(amount);

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
   ADD TO CART
========================================= */

function addToCart(product) {

  const existing =
    cart.find(
      (item) =>
        item.id === product.id
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id:
        product.id,

      name:
        product.name,

      price:
        Number(product.price),

      image:
        product.image || "",

      quantity:
        1

    });

  }


  saveCart();

  updateCartCount();

  showCartMessage(
    `${product.name} added to your cart.`
  );

}



/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(productId) {

  cart =
    cart.filter(
      (item) =>
        item.id !== productId
    );


  saveCart();

  updateCartCount();

}



/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

  const cartCount =
    document.getElementById(
      "cartCount"
    );


  if (!cartCount) {
    return;
  }


  const count =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );


  cartCount.textContent =
    count;

}



/* =========================================
   CART MESSAGE
========================================= */

function showCartMessage(
  message
) {

  let notification =
    document.getElementById(
      "cartNotification"
    );


  if (!notification) {

    notification =
      document.createElement(
        "div"
      );

    notification.id =
      "cartNotification";

    notification.className =
      "cart-notification";

    document.body.appendChild(
      notification
    );

  }


  notification.textContent =
    message;


  notification.classList.add(
    "show"
  );


  setTimeout(
    () => {

      notification.classList.remove(
        "show"
      );

    },
    2500
  );

}



/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts(
  products
) {

  if (!productGrid) {
    return;
  }


  if (
    !products ||
    products.length === 0
  ) {

    productGrid.innerHTML = `

      <div class="empty-state">

        <h3>
          No products found
        </h3>

        <p>
          Please check back soon.
        </p>

      </div>

    `;

    return;

  }


  productGrid.innerHTML =
    products.map(
      (product) => {

        const image =
          product.image ||
          "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=85";


        return `

          <article
            class="product-card"
          >

            <div
              class="product-image"
            >

              <img
                src="${image}"
                alt="${product.name}"
                loading="lazy"
              >

            </div>


            <div
              class="product-content"
            >

              <p
                class="product-category"
              >
                ${product.category || "Pet Supplies"}
              </p>


              <h3>
                ${product.name}
              </h3>


              <p
                class="product-description"
              >
                ${product.description || ""}
              </p>


              <div
                class="product-footer"
              >

                <strong>
                  ${formatMoney(
                    Number(product.price)
                  )}
                </strong>


                <button
                  type="button"
                  class="button button-primary add-to-cart"
                  data-product-id="${product.id}"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </article>

        `;

      }
    ).join("");


  document
    .querySelectorAll(
      ".add-to-cart"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset.productId;


            const product =
              allProducts.find(
                (item) =>
                  String(item.id) ===
                  String(id)
              );


            if (product) {

              addToCart(
                product
              );

            }

          }
        );

      }
    );

}



/* =========================================
   LOAD PRODUCTS
========================================= */

async function loadProducts() {

  if (!productGrid) {
    return;
  }


  productGrid.innerHTML = `

    <div class="loading-state">

      <h3>
        Loading products...
      </h3>

      <p>
        Please wait while we prepare the shop.
      </p>

    </div>

  `;


  try {

    const result =
      await getProducts();


    if (
      !result.success ||
      !Array.isArray(
        result.products
      )
    ) {

      throw new Error(
        "Invalid product data."
      );

    }


    allProducts =
      result.products;


    displayProducts(
      allProducts
    );


  } catch (error) {

    console.error(error);


    productGrid.innerHTML = `

      <div class="empty-state">

        <h3>
          We couldn't load the products
        </h3>

        <p>
          Please try again later.
        </p>

        <button
          type="button"
          class="button button-primary"
          id="retryProducts"
        >
          Try Again
        </button>

      </div>

    `;


    const retry =
      document.getElementById(
        "retryProducts"
      );


    if (retry) {

      retry.addEventListener(
        "click",
        loadProducts
      );

    }

  }

}



/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
  document.querySelector(
    ".menu-toggle"
  );

const navLinks =
  document.querySelector(
    ".nav-links"
  );


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
   CART BUTTON
========================================= */

const cartButton =
  document.getElementById(
    "cartButton"
  );


if (cartButton) {

  cartButton.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        showCartMessage(
          "Your cart is empty."
        );

        return;

      }


      window.location.href =
        "checkout.html";

    }
  );

}



/* =========================================
   START
========================================= */

updateCartCount();

loadProducts();
