/* =========================================
   HAPPYPAWS API CLIENT
========================================= */

const API_BASE_URL =
  window.HAPPYPAWS_API_URL ||
  "http://localhost:5000/api";


/* =========================================
   GENERIC REQUEST
========================================= */

async function apiRequest(
  endpoint,
  options = {}
) {

  const response =
    await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type":
            "application/json",

          ...(options.headers || {})
        },

        ...options
      }
    );


  let data;

  try {

    data =
      await response.json();

  } catch {

    data = {
      success: false,
      message:
        "The server returned an invalid response."
    };

  }


  if (!response.ok) {

    throw new Error(
      data.message ||
      "Something went wrong."
    );

  }


  return data;

}


/* =========================================
   GET PRODUCTS
========================================= */

async function getProducts() {

  return apiRequest(
    "/products"
  );

}


/* =========================================
   GET PRODUCT
========================================= */

async function getProduct(
  productId
) {

  return apiRequest(
    `/products/${productId}`
  );

}


/* =========================================
   SEARCH PRODUCTS
========================================= */

async function searchProducts(
  query
) {

  return apiRequest(
    `/products/search?q=${encodeURIComponent(query)}`
  );

}


/* =========================================
   CREATE ORDER
========================================= */

async function createOrder(
  orderData
) {

  return apiRequest(
    "/orders",
    {
      method: "POST",

      body:
        JSON.stringify(
          orderData
        )
    }
  );

}


/* =========================================
   CHECK BACKEND
========================================= */

async function checkBackend() {

  return apiRequest(
    "/health"
  );

}
