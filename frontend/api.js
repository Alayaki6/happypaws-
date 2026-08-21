/* =========================================
   HAPPYPAWS API CLIENT
========================================= */


/*
  DEVELOPMENT:
  Uses the local backend.

  PRODUCTION:
  Change HAPPYPAWS_API_URL to the
  deployed backend URL.

  Example:

  https://api.happypaws.com/api
*/


const HAPPYPAWS_API_URL =
  window.HAPPYPAWS_API_URL ||
  "http://localhost:5000/api";


/* =========================================
   API REQUEST
========================================= */

async function apiRequest(
  endpoint,
  options = {}
) {

  const requestOptions = {

    method:
      options.method || "GET",

    headers: {

      "Content-Type":
        "application/json",

      ...(options.headers || {})

    }

  };


  if (
    options.body !== undefined
  ) {

    requestOptions.body =
      options.body;

  }


  const response =
    await fetch(
      `${HAPPYPAWS_API_URL}${endpoint}`,
      requestOptions
    );


  let data;


  try {

    data =
      await response.json();

  } catch (error) {

    throw new Error(
      "The server returned an invalid response."
    );

  }


  if (!response.ok) {

    throw new Error(
      data.message ||
      `Request failed with status ${response.status}.`
    );

  }


  return data;

}


/* =========================================
   CHECK BACKEND
========================================= */

async function checkBackend() {

  return apiRequest(
    "/health"
  );

}


/* =========================================
   GET STORE INFORMATION
========================================= */

async function getStore() {

  return apiRequest(
    "/store"
  );

}


/* =========================================
   GET ALL PRODUCTS
========================================= */

async function getProducts() {

  return apiRequest(
    "/products"
  );

}


/* =========================================
   GET SINGLE PRODUCT
========================================= */

async function getProduct(
  productId
) {

  if (!productId) {

    throw new Error(
      "Product ID is required."
    );

  }


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

  const search =
    String(
      query || ""
    ).trim();


  return apiRequest(
    `/products/search?q=${encodeURIComponent(search)}`
  );

}


/* =========================================
   CREATE ORDER
========================================= */

async function createOrder(
  orderData
) {

  if (!orderData) {

    throw new Error(
      "Order information is required."
    );

  }


  return apiRequest(
    "/orders",
    {

      method:
        "POST",

      body:
        JSON.stringify(
          orderData
        )

    }
  );

}


/* =========================================
   API ERROR HELPER
========================================= */

function getApiErrorMessage(
  error
) {

  if (
    error &&
    error.message
  ) {

    return error.message;

  }


  return "Unable to connect to HappyPaws.";
}


/* =========================================
   EXPORT API URL FOR DEBUGGING
========================================= */

console.log(
  "HappyPaws API:",
  HAPPYPAWS_API_URL
);
