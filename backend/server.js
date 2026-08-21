const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: "*"
  })
);

app.use(
  express.json()
);


/* =========================================
   STORE INFORMATION
========================================= */

const store = {
  name: "HappyPaws",
  country: "United States",
  currency: "USD",
  email: "support@happypaws.com"
};


/* =========================================
   PRODUCTS
========================================= */

const products = [
  {
    id: 1,
    name: "Premium Dog Bed",
    category: "Dog",
    price: 49.99,
    stock: 25
  },

  {
    id: 2,
    name: "Interactive Dog Toy",
    category: "Dog",
    price: 19.99,
    stock: 40
  },

  {
    id: 3,
    name: "Cat Comfort Bed",
    category: "Cat",
    price: 39.99,
    stock: 20
  },

  {
    id: 4,
    name: "Cat Play Toy",
    category: "Cat",
    price: 14.99,
    stock: 50
  },

  {
    id: 5,
    name: "Pet Grooming Kit",
    category: "Grooming",
    price: 24.99,
    stock: 30
  },

  {
    id: 6,
    name: "Premium Pet Food Bowl",
    category: "Food",
    price: 17.99,
    stock: 35
  }
];


/* =========================================
   HEALTH CHECK
========================================= */

app.get(
  "/api/health",
  (req, res) => {

    res.json({
      success: true,
      message: "HappyPaws backend is running.",
      timestamp: new Date().toISOString()
    });

  }
);


/* =========================================
   STORE INFORMATION
========================================= */

app.get(
  "/api/store",
  (req, res) => {

    res.json({
      success: true,
      store
    });

  }
);


/* =========================================
   GET ALL PRODUCTS
========================================= */

app.get(
  "/api/products",
  (req, res) => {

    res.json({
      success: true,
      products
    });

  }
);


/* =========================================
   GET SINGLE PRODUCT
========================================= */

app.get(
  "/api/products/:id",
  (req, res) => {

    const productId =
      Number(req.params.id);


    const product =
      products.find(
        (item) =>
          item.id === productId
      );


    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found."
      });

    }


    res.json({
      success: true,
      product
    });

  }
);


/* =========================================
   PRODUCT SEARCH
========================================= */

app.get(
  "/api/products/search",
  (req, res) => {

    const search =
      String(
        req.query.q || ""
      )
      .trim()
      .toLowerCase();


    if (!search) {

      return res.json({
        success: true,
        products
      });

    }


    const results =
      products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(search) ||

          product.category
            .toLowerCase()
            .includes(search)
      );


    res.json({
      success: true,
      products: results
    });

  }
);


/* =========================================
   CREATE ORDER
========================================= */

app.post(
  "/api/orders",
  (req, res) => {

    const {
      customer,
      items,
      shipping
    } = req.body;


    if (
      !customer ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Customer information and cart items are required."
      });

    }


    let total = 0;


    const orderItems =
      items.map(
        (item) => {

          const product =
            products.find(
              (product) =>
                product.id ===
                Number(item.id)
            );


          if (!product) {
            return null;
          }


          const quantity =
            Math.max(
              1,
              Number(
                item.quantity
              ) || 1
            );


          const subtotal =
            product.price *
            quantity;


          total += subtotal;


          return {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            subtotal
          };

        }
      )
      .filter(Boolean);


    if (
      orderItems.length === 0
    ) {

      return res.status(400).json({
        success: false,
        message:
          "No valid products were included in the order."
      });

    }


    /*
      IMPORTANT:

      This creates an order record
      for testing.

      REAL PAYMENT PROCESSING WILL
      BE CONNECTED THROUGH A SECURE
      PAYMENT PROVIDER LATER.

      We will NEVER put bank,
      Bitcoin, PayPal or payment
      secret keys in this frontend.
    */


    const order = {

      orderId:
        `HP-${Date.now()}`,

      customer,

      shipping:
        shipping || null,

      items:
        orderItems,

      total:
        Number(
          total.toFixed(2)
        ),

      currency:
        "USD",

      status:
        "pending_payment",

      createdAt:
        new Date().toISOString()

    };


    res.status(201).json({

      success: true,

      message:
        "Order created successfully.",

      order

    });

  }
);


/* =========================================
   404
========================================= */

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        "Route not found."

    });

  }
);


/* =========================================
   ERROR HANDLER
========================================= */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {

    console.error(error);


    res.status(500).json({

      success: false,

      message:
        "Internal server error."

    });

  }
);


/* =========================================
   START SERVER
========================================= */

app.listen(
  PORT,
  () => {

    console.log(
      `HappyPaws backend running on port ${PORT}`
    );

  }
);
