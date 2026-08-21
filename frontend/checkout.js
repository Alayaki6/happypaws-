/* =========================================
   HAPPYPAWS CHECKOUT
========================================= */

const checkoutForm =
  document.getElementById("checkoutForm");

const checkoutItems =
  document.getElementById("checkoutItems");

const checkoutTotal =
  document.getElementById("checkoutTotal");

const checkoutMessage =
  document.getElementById("checkoutMessage");


/* =========================================
   CART
========================================= */

function getCart() {

  try {

    return JSON.parse(
      localStorage.getItem("happypaws_cart")
    ) || [];

  } catch {

    return [];

  }

}


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
   DISPLAY ORDER
========================================= */

function displayCheckout() {

  const cart = getCart();


  if (!checkoutItems) {
    return;
  }


  if (cart.length === 0) {

    checkoutItems.innerHTML = `

      <div class="empty-state">

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add some products before checking out.
        </p>

        <a
          href="index.html#products"
          class="button button-primary"
        >
          Browse Products
        </a>

      </div>

    `;

    if (checkoutTotal) {
      checkoutTotal.textContent =
        "$0.00";
    }

    return;

  }


  let total = 0;


  checkoutItems.innerHTML =
    cart.map(
      (item) => {

        const quantity =
          Number(item.quantity) || 1;

        const price =
          Number(item.price) || 0;

        const subtotal =
          price * quantity;

        total += subtotal;


        return `

          <div class="checkout-item">

            <div>

              <strong>
                ${item.name}
              </strong>

              <p>
                Quantity: ${quantity}
              </p>

            </div>

            <strong>
              ${formatMoney(subtotal)}
            </strong>

          </div>

        `;

      }
    ).join("");


  if (checkoutTotal) {

    checkoutTotal.textContent =
      formatMoney(total);

  }

}


/* =========================================
   SUBMIT ORDER
========================================= */

if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const cart = getCart();


      if (cart.length === 0) {

        checkoutMessage.textContent =
          "Your cart is empty.";

        return;

      }


      const formData =
        new FormData(
          checkoutForm
        );


      const customer = {

        name:
          formData.get("name"),

        email:
          formData.get("email"),

        phone:
          formData.get("phone"),

        address:
          formData.get("address"),

        city:
          formData.get("city"),

        state:
          formData.get("state"),

        zip:
          formData.get("zip"),

        country:
          formData.get("country")

      };


      const orderItems =
        cart.map(
          (item) => ({

            productId:
              item.id,

            name:
              item.name,

            quantity:
              Number(item.quantity) || 1

          })
        );


      checkoutMessage.textContent =
        "Creating your order...";


      try {

        const result =
          await createOrder({

            customer,

            items:
              orderItems

          });


        if (!result.success) {

          throw new Error(
            result.message ||
            "Unable to create order."
          );

        }


        /*
          IMPORTANT:

          We do NOT collect card numbers
          on this website.

          The backend/payment provider will
          handle secure payment processing.
        */


        if (result.paymentUrl) {

          window.location.href =
            result.paymentUrl;

          return;

        }


        checkoutMessage.textContent =
          "Your order was received. Payment setup is coming next.";


        localStorage.removeItem(
          "happypaws_cart"
        );


        displayCheckout();


      } catch (error) {

        console.error(error);

        checkoutMessage.textContent =
          error.message ||
          "Something went wrong. Please try again.";

      }

    }
  );

}


/* =========================================
   START
========================================= */

displayCheckout();
